const express = require('express');
const {check, validationResult } = require("express-validator");
const router = express.Router();

const Subject = require('../models/Subject');


/**
 *@route   post api/subject
 *@desc    Create a subject by id
 *@access   Private
 */
router.post('/', [
    check('name', 'Please enter a name').isString(),
    check('category', 'Please add a category id').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) return res.status(400).json({ errors: errors.array()})

    try {
        const { name, category } = req.body;

        let subject = await Subject.FindOne({ name, category})
        if(subject) return res.satuts(400).json('The subject already exist');

         subject = new Subject ({
            name,
            category,
            tutors
        });

        subject.save();

        res.status(200).json(subject)
    } catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

/**
 *@route   GET api/subject/:id
 *@desc    Get a subject by id
 *@access   Public
 */
router.get('/', async(req, res) => {
    try {
        const subject = await Subject.findById( req.params.id)
        if(!subject) return res.status(400).json('The subject with the given id was not found');

        res.status(200).json(subject)
    } catch (err) {

    }
})

/**
 *@route   GET api/subject
 *@desc    Get all subject 
 *@access   Public
 */
router.post('/sub-all', async (req, res) => {
    try {
      const subject = await Subject.find({})
      .populate('category', 'name -_id');

      if(subject < 1) return res.status(400).json('No subject available');

      res.status(200).json(subject)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


/**
 *@route   GET api/subject/search?name 
 *@desc    Get a subject by name
 *@access   Public
 */
    router.get('/search', async (req, res) => {
        const name = req.query.name;

        try {
            const subject = await Subject
            .find({$text: {
                $search: name
            }})
            .populate('category', 'name -_id')
            .sort({ name: 1})

            res.status(200).json(subject)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    })

/**
 *@route   PUT api/subject/:id
 *@desc    Update a subject
 *@access   Private
 */
router.put('/:id', async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
        
        const { name, category, tutors } = req.body;
        const subjectField = {};
        if(name) subjectField.name = name;
        if(category) subjectField.category = category;
        if(tutors) subjectField.tutors = tutors;

        try {
            let subject = await Subject.findById(req.params.id);
            if(!subject) return res.status(400).json({ msg: 'Subject not found'});

            subject = await Subject.findByIdAndUpdate(req.params.id, {$set: subjectField}, { new:true})

            res.json(subject)

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
})

/**
 *@route   DELETE api/subject/:id
 *@desc    Delete a subject
 *@access   Private
 */

 router.delete('/:id', async (req, res) => {
     try {
        let subject = await Subject.findById(req.params.id);
        if(!subject) return res.status(400).json({ msg: 'Subject not found'});

        await subject.findByIdAndRemove(req.params.id); 

        res.status(200).json(subject);
     } catch (err) {

     }
 })
module.exports = router;
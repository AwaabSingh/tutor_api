const mongoose = require('mongoose');
const Category = require('./Category');

const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    tutors: [
        {
            "type": mongoose.Schema.Type.Objectid,
            ref: 'Tutor',
        }
    ]
});

SubjectSchema.index({
    name: 'text'
})

module.exports = mongoose.model('Subject', SubjectSchema);
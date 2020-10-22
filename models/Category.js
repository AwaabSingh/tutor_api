const mongoose = require('mongoose');
const Subect = require('./Subject');

const CategorySchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    description: {
        type: String
    },
    subject: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Subject'
    }
})

module.exports = mongoose.model('Category', CategorySchema);
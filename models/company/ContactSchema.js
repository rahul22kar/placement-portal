const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    designation: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = ContactSchema

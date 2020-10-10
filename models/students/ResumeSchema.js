const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    link: String,
    approved: {
        type: Number,
        default: -1
    }
}, { strict: true });

module.exports = ResumeSchema;
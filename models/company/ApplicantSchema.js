const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
    student_id: {
        type: String,
        required: true
    },
    shortlisted: {
        type: Boolean,
        required: true,
        default: false
    },
    selected: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = ApplicantSchema;

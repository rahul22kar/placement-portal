const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Announcements = new Schema({
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course_type: {
        type: [String],
        required: true
    },
    year_of_study: {
        type: [String],
        required: true
    },
    branch: {
        type: [String],
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
});

const AnnouncementsSchema = mongoose.model('announcements', Announcements);

module.exports = AnnouncementsSchema;

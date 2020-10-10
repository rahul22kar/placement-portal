const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    company_name: String,
    experience_type: String,
    experience_location: String,
    description: String,
    start_date: Date,
    end_date: Date,
    active: {
        type: Boolean,
        default: false
    }
}, { strict: true } );

module.exports = ExperienceSchema;

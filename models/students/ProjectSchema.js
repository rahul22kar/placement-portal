const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    project_name: String,
    guidance: String,
    project_location: String,
    description: String,
    start_date: Date,
    end_date: Date,
    active: {
        type: Boolean,
        default: false
    }
}, { strict: true });

module.exports = ProjectSchema;

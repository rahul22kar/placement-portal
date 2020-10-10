const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExperienceSchema = require('./ExperienceSchema');
const ProjectSchema = require('./ProjectSchema');
const ResumeSchema = require('./ResumeSchema');
const StudentsSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address_line_a: {
        type: String,
        required: true
    },
    address_line_b: {
        type: String,
        required: true
    },
    phone_a: {
        type: String,
        required: true
    },
    phone_b: {
        type: String
    },
    course_type: {
        type: String,
        required: true
    },
    year_of_study: {
        type: String,
        required: true
    },
    year_of_join: {
        type: String
    },
    branch: {
        type: String
    },
    roll_number: {
        type: String,
        required: true
    },
    cpi: {
        type: String,
        required: true
    },
    cv: {
        type: [ResumeSchema],
        required: true
    },
    interests: {
        type: [String]
    },
    skills: {
        type: [String]
    },
    profile_links: {
        type: Map,
        of: String
    },
    profile_headline: {
        type: String
    },
    profile_picture: {
        type: String
    },
    experience: {
        type: [ExperienceSchema]
    },
    projects: {
        type: [ProjectSchema]
    },
    job_applications: {
        type: [String]
    },
    job_count: {
        type: Number,
        default: 0
    },
    recommended: {
        type: Boolean,
        default: false
    },
    approval_status: {
        type: Number,
        default: -1
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    last_modified_date: {
        type: Date,
        default: Date.now
    },
    active_status: {
        type: Boolean,
        default: true
    },
}, { strict: true });

const StudentProfiles = mongoose.model('student_profiles', StudentsSchema);

module.exports = StudentProfiles;

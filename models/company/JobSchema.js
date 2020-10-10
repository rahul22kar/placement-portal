const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = require('./ApplicantSchema');

const JobSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    job_headline: {
        type: String,
        required: true
    },
    type_of_job: {
        type: [String],
        required: true
    },
    job_description: {
        type: String,
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    job_designation: {
        type: String,
        required: true
    },
    number_of_openings: {
        type: String,
        required: true
    },
    application_deadline: {
        type: Date,
        default: Date.now
    },
    eligible_branches: {
        type: [String],
        required: true
    },
    type_of_interview: {
        type: [String],
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    test_type: {
        type: [String],
        required: true
    },
    minimum_cpi: {
        type: String,
        required: true
    },
    special_requirements: {
        type: String
    },
    resume_criteria: {
        type: String,
        required: true
    },
    base_salary: {
        type: String,
        required: true
    },
    bonus_perks: {
        type: String,
    },
    contract_link: {
        type: String,
    },
    other_pay: {
        type: String,
    },
    ctc_effective: {
        type: String,
    },
    members_oncampus: {
        type: String
    },
    days_oncampus: {
        type: String
    },
    other_requirement: {
        type: String
    },
    applicants: {
        type: [ApplicantSchema]
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
    active: {
        type: Boolean,
        default: true
    }
});

const JobProfiles = mongoose.model('job_profiles', JobSchema);

module.exports = JobProfiles;

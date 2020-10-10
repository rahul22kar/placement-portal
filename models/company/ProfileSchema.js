const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = require('./ContactSchema');

const CompanySchema = new Schema({
    email:{
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    company_introduction: {
        type: String,
        required: true
    },
    logo_link: {
        type: String,
        required: true
    },
    company_specialization: {
        type: String,
        required: true
    },
    contact_details: {
        type:[ContactSchema]
    },
    type_of_company: {
        type: String,
        required: true
    },
    company_address: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
    approval_status: {
        type: Number,
        default: 1
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
    }
});

const CompanyProfiles = mongoose.model('company_profiles', CompanySchema)

module.exports = CompanyProfiles;

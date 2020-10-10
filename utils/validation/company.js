const validator = require('validator');

const createProfileValidator = (inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('email')) errors.email = 'User authentication is ambiguous. Contact admin';
    if(!inputValues.hasOwnProperty('company_name')) errors.company_name = 'Company name field is required';
    if(!inputValues.hasOwnProperty('website')) errors.website = 'Company website field is required';
    if(!inputValues.hasOwnProperty('company_introduction')) errors.company_introduction = 'Company introduction field is required';
    if(!inputValues.hasOwnProperty('company_specialization')) errors.company_specialization = 'Company specialization field is required';
    if(!inputValues.hasOwnProperty('logo_link')) errors.logo_link = 'Company Logo field is required';
    if(inputValues.hasOwnProperty('contact_details')) {
        if(!Array.isArray(inputValues.contact_details)) {
            errors.contact_details = 'This field needs to be an array of contact details';
        }
    }
    else {
        errors.contact_details = 'This field is required';
    }
    if(!inputValues.hasOwnProperty('company_address')) errors.company_address = 'Address line field is required';
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const createJobValidator =(inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('email')) errors.email = 'User authentication is ambiguous. Contact admin';
    if(!inputValues.hasOwnProperty('job_headline')) errors.job_headline = 'Job headline field is required';
    if(!inputValues.hasOwnProperty('type_of_job')) errors.type_of_job = 'Job type field is required';
    if(!inputValues.hasOwnProperty('job_description')) errors.job_description = 'Job description field is required';
    if(!inputValues.hasOwnProperty('job_location')) errors.job_location = 'Job location field is required';
    if(!inputValues.hasOwnProperty('job_designation')) errors.job_designation = 'Job designation field is required';
    if(!inputValues.hasOwnProperty('number_of_openings')) errors.number_of_openings = 'Number of openings field is required';
    if(!inputValues.hasOwnProperty('job_headline')) errors.job_headline = 'Job headline field is required';
    if(inputValues.hasOwnProperty('skills')) {
        if(!Array.isArray(inputValues.skills)) {
            errors.skills = 'This field needs to be an array of string';
        }
    }
    else {
        errors.skills = 'This field is required';
    }
    if(inputValues.hasOwnProperty('test_type')) {
        if(!Array.isArray(inputValues.test_type)) {
            errors.test_type = 'This field needs to be an array of string';
        }
    }
    else {
        errors.test_type = 'This field is required';
    }
    if(!inputValues.hasOwnProperty('minimum_cpi')) errors.minimum_cpi = 'Minimum cpi field is required';
    if(!inputValues.hasOwnProperty('resume_criteria')) errors.resume_criteria = 'Resume criteria field is required';
    if(!inputValues.hasOwnProperty('base_salary')) errors.base_salary = 'Base salary field is required';
    return {
        errors,
        isValid: Object.keys(errors).length ===0
    }
};

module.exports = {
    createProfileValidator,
    createJobValidator
};

const validator = require('validator');
const moment = require('moment');

const createProfileValidator = (inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('email')) errors.email = 'User authentication is ambiguous. Contact admin';
    if(!inputValues.hasOwnProperty('first_name')) errors.first_name = 'First name field is required';
    if(!inputValues.hasOwnProperty('last_name')) errors.last_name = 'Last name field is required';
    if(inputValues.hasOwnProperty('dob')) {
        if(!validator.isISO8601(inputValues.dob)) {
            errors.dob = 'Invalid date';
        }
    }
    else {
        errors.dob = 'Date field is required';
    }
    if(!inputValues.hasOwnProperty('gender')) errors.gender = 'Gender field is required';
    if(!inputValues.hasOwnProperty('address_line_a')) errors.address_line_a = 'This address field is required';
    if(!inputValues.hasOwnProperty('address_line_b')) errors.address_line_b = 'This address field is required';
    if(!inputValues.hasOwnProperty('phone_a')) errors.phone_a = 'This field is required';
    if(!inputValues.hasOwnProperty('course_type')) errors.course_type = 'This field is required';
    if(!inputValues.hasOwnProperty('branch')) errors.branch = 'This field is required';
    if(!inputValues.hasOwnProperty('year_of_study')) errors.year_of_study = 'This field is required';
    if(!inputValues.hasOwnProperty('year_of_join')) errors.year_of_join = 'This field is required';
    if(!inputValues.hasOwnProperty('cpi')) errors.cpi = 'This field is required';
    if(!inputValues.hasOwnProperty('cv')) errors.cv = 'CV is required for profile submission';
    if(!inputValues.hasOwnProperty('roll_number')) errors.roll_number = 'Roll number is required';
    if(inputValues.hasOwnProperty('interests')) {
        if(!Array.isArray(inputValues.interests)) {
            errors.interests = 'This field needs to be an array of string';
        }
    }
    else {
        errors.interests = 'This field is required';
    }
    if(inputValues.hasOwnProperty('skills')) {
        if(!Array.isArray(inputValues.skills)) {
            errors.skills = 'This field needs to be an array of string';
        }
    }
    else {
        errors.skills = 'This field is required';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const editProfileValidator = (type, inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('email')) errors.email = 'User authentication is ambiguous. Contact admin';
    if(type === "basic") {
        if(!inputValues.hasOwnProperty('first_name')) errors.first_name = 'First name field is required';
        if(!inputValues.hasOwnProperty('last_name')) errors.last_name = 'Last name field is required';
        if(inputValues.hasOwnProperty('dob')) {
            if(!validator.isISO8601(inputValues.dob)) {
                errors.dob = 'Invalid date';
            }
        }
        else {
            errors.dob = 'Date field is required';
        }
        if(!inputValues.hasOwnProperty('gender')) errors.gender = 'Gender field is required';
        if(!inputValues.hasOwnProperty('address_line_a')) errors.address_line_a = 'This address field is required';
        if(!inputValues.hasOwnProperty('address_line_b')) errors.address_line_b = 'This address field is required';
        if(!inputValues.hasOwnProperty('phone_a')) errors.phone_a = 'This field is required';
    }
    else if(type === "academic") {
        if(!inputValues.hasOwnProperty('course_type')) errors.course_type = 'This field is required';
        if(!inputValues.hasOwnProperty('branch')) errors.branch = 'This field is required';
        if(!inputValues.hasOwnProperty('year_of_study')) errors.year_of_study = 'This field is required';
        if(!inputValues.hasOwnProperty('year_of_join')) errors.year_of_join = 'This field is required';
        if(!inputValues.hasOwnProperty('cpi')) errors.cpi = 'This field is required';
        if(!inputValues.hasOwnProperty('roll_number')) errors.roll_number = 'This field is required';
    }
    else if(type === "professional") {
        if(!inputValues.hasOwnProperty('cv')) errors.cv = 'CV is required for profile submission';
        if(inputValues.hasOwnProperty('interests')) {
            if(!Array.isArray(inputValues.interests)) {
                errors.interests = 'This field needs to be an array of string';
            }
        }
        else {
            errors.interests = 'This field is required';
        }
        if(inputValues.hasOwnProperty('skills')) {
            if(!Array.isArray(inputValues.skills)) {
                errors.skills = 'This field needs to be an array of string';
            }
        }
        else {
            errors.skills = 'This field is required';
        }
    }
    else {
        errors.invalid_type = 'Internal server error';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const addExperienceValidator = (inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('company_name')) errors.company_name = 'This field is required';
    if(!inputValues.hasOwnProperty('experience_type')) errors.experience_type = 'This field is required';
    if(!inputValues.hasOwnProperty('experience_location')) errors.location = 'This field is required';
    if(!inputValues.hasOwnProperty('description')) errors.description = 'This field is required';
    if(inputValues.hasOwnProperty('start_date')) {
        if(!validator.isISO8601(inputValues.start_date)) {
            errors.start_date = 'Invalid time format';
        }
        if(inputValues.hasOwnProperty('end_date')) {
            if(moment(inputValues.end_date, 'YYYY-MM-DD').isBefore(moment(inputValues.start_date, 'YYYY-MM-DD'))) {
                errors.end_date = 'End date cannot be before start date';
            }
        }
    } else {
        errors.start_date = 'This field is required';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const addProjectValidator = (inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('project_name')) errors.project_name = 'This field is required';
    if(!inputValues.hasOwnProperty('guidance')) errors.guidance = 'This field is required';
    if(!inputValues.hasOwnProperty('project_location')) errors.location = 'This field is required';
    if(!inputValues.hasOwnProperty('description')) errors.description = 'This field is required';
    if(inputValues.hasOwnProperty('start_date')) {
        if(!validator.isISO8601(inputValues.start_date)) {
            errors.start_date = 'Invalid time format';
        }
        if(inputValues.hasOwnProperty('end_date')) {
            if(moment(inputValues.end_date, 'YYYY-MM-DD').isBefore(moment(inputValues.start_date, 'YYYY-MM-DD'))) {
                errors.end_date = 'End date cannot be before start date';
            }
        }
    } else {
        errors.start_date = 'This field is required';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const reportBugValidator = (inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('feature')) errors.feature = "Feature field is required";
    if(!inputValues.hasOwnProperty('bug_description')) errors.bug_description = "Description field is required";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const createQueryValidator = (inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('subject')) errors.subject = "Subject field is required";
    if(!inputValues.hasOwnProperty('query')) errors.query = "Query field is required";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const resetPasswordValidator = (inputValues) => {
    let errors = {};
    if(inputValues.hasOwnProperty('password')) {
        if(inputValues.hasOwnProperty('confirm_password')) {
            if(!validator.equals(inputValues.password, inputValues.confirm_password)) {
                errors.password = "The password does not matches with confirm password";
            }
        }
        else {
            errors.password = "Confirm password field cannot be empty";
        }
        if(!validator.isLength(inputValues.password, { min: 6, max: 15 })) {
            errors.password = "Password should be between 6 to 15 characters long";
        }
    }
    else {
        errors.password = "Password field cannot be empty";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

module.exports = {
    createProfileValidator: createProfileValidator,
    editProfileValidator: editProfileValidator,
    addExperienceValidator: addExperienceValidator,
    addProjectValidator: addProjectValidator,
    reportBugValidator: reportBugValidator,
    resetPasswordValidator: resetPasswordValidator,
    createQueryValidator: createQueryValidator
};

const validator = require('validator');

const createLoginValidator = (inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('email')) errors.email = "Email field cannot be empty";
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
        errors.email = "Password field cannot be empty";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const createAnnouncementValidator = (inputValues) => {
    let errors = {};
    if(!inputValues.hasOwnProperty('subject')) errors.subject = "Subject field is required";
    if(!inputValues.hasOwnProperty('description')) errors.description = "Description field is required";
    if(!inputValues.hasOwnProperty('course_type')) errors.course_type = "Type field is required";
    if(!inputValues.hasOwnProperty('branch')) errors.branch = "This field is required";
    if(!inputValues.hasOwnProperty('year_of_study')) errors.year_of_study = "This field is required";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};
module.exports = {
    createLoginValidator: createLoginValidator,
    createAnnouncementValidator: createAnnouncementValidator
};
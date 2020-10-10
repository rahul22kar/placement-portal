const validator = require('validator');
/*
    Input:  email, password
 */
const registerValidator = (inputValues) => {
    let errors = {};
    let validMailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\\.)?[a-zA-Z]+\\.)?(iitgoa)\\.ac.in$");
    if(inputValues.hasOwnProperty('email')) {
        if(!validMailRegex.test(inputValues.email)) {
            errors.email = "Invalid email input";
        }
    }
    else {
        errors.email = "Email field cannot be empty";
    }
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

/*
    Input:  email, password, role
 */

const loginValidator = (inputValues) => {
    let errors = {};
    let validRoles = { 'student': 1, 'admin': 1, 'company': 1};
    let validMailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\\.)?[a-zA-Z]+\\.)?(iitgoa)\\.ac.in$");
    if(inputValues.hasOwnProperty('role') && inputValues.role !== 'company'){
        if(inputValues.hasOwnProperty('email')) {
            if(!validMailRegex.test(inputValues.email)) {
                errors.email = "Invalid email input";
            }
        }
        else {
            errors.email = "Email field cannot be empty";
        }
    }

    if(inputValues.hasOwnProperty('password')) {
        if(!validator.isLength(inputValues.password, { min: 6, max: 15 })) {
            errors.password = "Password should be between 6 to 15 characters long";
        }
    }
    else {
        errors.email = "Password field cannot be empty";
    }
    if(inputValues.hasOwnProperty('role')) {
        if(!validRoles.hasOwnProperty(inputValues.role)) {
            errors.role = "Invalid role specified";
        }
    }
    else {
        errors.role = "Role is not specified";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};


module.exports = {
    registerValidator: registerValidator,
    loginValidator: loginValidator
}
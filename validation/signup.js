const Validator = require('validator');
const isEmpty = require("is-empty");

module.exports = validateSignUpInput = data => {
    let errors = {};

    let {user_name, email,  password} = data 
    user_name = !isEmpty(user_name) ? user_name : "";
    email = !isEmpty(email) ? email : "";
    password = !isEmpty(password) ? password : "";

    if (Validator.isEmpty(user_name)) {
        errors.user_name = "username is required";
    }

    if (Validator.isEmpty(email)) {
        errors.email = "email is required";
    } else if (!Validator.isEmail(email)) { 
        errors.email = "enter a valid email";
    }

    if (Validator.isEmpty(password)) {
        errors.password = "password is required";
    } else if (!Validator.isLength(password, { min:6, max:30 })) {
        errors.password = "password must be at least 6 characters";
    } 

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
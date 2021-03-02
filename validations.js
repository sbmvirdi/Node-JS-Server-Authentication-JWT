const joi = require('joi')

const registerValidation = (data) => {

    const schema = {
        name: joi.string().min(6).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    };

    return joi.validate(data,schema);
}


const loginValidation = (data) => {

    const schema  = {
        email:joi.string().required(),
        password:joi.string().required()
    }

    return joi.validate(data,schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

//Validation

const Joi = require('@hapi/joi');

//Register Validation
const loginValidation = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        pwd: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

//podemos ir agregando todos los schemas que vamos a validar
const registerValidation = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        surname: Joi.string().min(2).max(255).required(),
        pwd: Joi.string().min(6).required(),
        coordinates: Joi.string().min(2),
        picture: Joi.string().min(2),
        email: Joi.string().min(6).required().email(),
        mobile: Joi.string().min(2).required(),
        city: Joi.string().min(2),
        address: Joi.string().min(6)

    });
    
    return schema.validate(data);
}
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation; 

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
        dni: Joi.string().regex(/^[0-9]+$/).min(7).max(9).required(),
        name: Joi.string().min(2).max(255).required(),
        surname: Joi.string().min(2).max(255).required(),
        pwd: Joi.string().min(6).required(),
        coordinates: Joi.string().min(2),
        picture: Joi.string().base64(),
        email: Joi.string().min(6).required().email(),
        mobile: Joi.string().min(2).required(),
        city: Joi.string().min(2),
        address: Joi.string().min(6)

    });

    return schema.validate(data);
}
const requestValidation = (data: any) => {
    const schema = Joi.object({
        professionalid: Joi.string().required(),
        userid: Joi.string().required(),
        specialtyid: Joi.array().required(),
        picture: Joi.string().base64()
    });
    return schema.validate(data);
}
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.requestValidation = requestValidation; 

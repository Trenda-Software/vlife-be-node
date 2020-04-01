//Validation

const Joi = require('@hapi/joi');

//Register Validation
const loginValidation = (data: any) => {
    const schema = Joi.object().keys({
        email: Joi.string().min(6).required().email().messages({
            'string.base': 'El email debe ser un string',
            'string.empty': 'Por favor ingrese el email',
            'string.min': 'El campo no puede tener menos de 6 caracteres',
            'string.email': 'Debe ingresar un email valido',
            'any.required': 'Por favor ingrese el email',
        }),
        pwd: Joi.string().min(6).required().messages({
            'string.base': 'El email debe ser un string',
            'string.empty': 'Por favor ingrese la clave',
            'string.min': 'El campo no puede tener menos de 6 caracteres',
            'any.required': 'Por favor ingrese la clave',
        }),
    });
    return schema.validate(data);
}


//podemos ir agregando todos los schemas que vamos a validar
const registerValidation = (data: any) => {
    const schema = Joi.object().keys({
        dni: Joi.string().regex(/^[0-9]+$/).min(7).max(9).required().messages({
            'string.empty': 'Por favor ingrese el DNI',
            'string.pattern.base': 'El DNI solo acepta numeros',
            'string.min': 'El campo no puede tener menos de 7 caracteres',
            'string.max': 'El campo no puede tener mas de 9 caracteres',
            'any.required': 'Por favor ingrese el DNI',
        }),
        name: Joi.string().min(2).max(255).required().messages({
            'string.empty': 'Por favor ingrese el nombre',
            'string.min': 'El campo no puede tener menos de 2 caracteres',
            'string.max': 'El campo no puede tener mas de 255 caracteres',
            'any.required': 'Por favor ingrese el nombre',
        }),
        surname: Joi.string().min(2).max(255).required().messages({
            'string.empty': 'Por favor ingrese el apellido',
            'string.min': 'El campo no puede tener menos de 2 caracteres',
            'string.max': 'El campo no puede tener mas de 255 caracteres',
            'any.required': 'Por favor ingrese el apellido',
        }),
        pwd: Joi.string().min(6).required().messages({
            'string.empty': 'Por favor ingrese la clave',
            'string.min': 'El campo no puede tener menos de 6 caracteres',
            'any.required': 'Por favor ingrese la clave',
        }),
        coordinates: Joi.string().min(2).messages({
            'string.min': 'El campo no puede tener menos de 2 caracteres',
        }),
        gender: Joi.number().min(1).max(3).required().messages({
            'number.integer': 'El campo debe ser un Id',
            'number.min': 'El valor del campo debe estar entre 1 y 3',
            'number.max': 'El valor del campo debe estar entre 1 y 3',
        }),
        picture: Joi.string().base64().messages({
            'string.base64': 'El campo debe ser base64',
            'any.required': 'Por favor ingrese la imagen',
        }),
        email: Joi.string().min(6).required().email().messages({
            'string.base': 'El email debe ser un string',
            'string.empty': 'Por favor ingrese el email',
            'string.min': 'El campo no puede tener menos de 6 caracteres',
            'string.email': 'Debe ingresar un email válido',
            'any.required': 'Por favor ingrese el email',
        }),
        mobile: Joi.string().min(2).required().messages({
            'string.empty': 'Por favor ingrese el mobile',
            'string.min': 'El campo no puede tener menos de 2 caracteres',
            'any.required': 'Por favor ingrese el mobile',
        }),
        city: Joi.string().min(2).messages({
            'string.empty': 'Por favor ingrese la ciudad',
            'string.min': 'El campo no puede tener menos de 2 caracteres',
        }),
        address: Joi.string().min(6).messages({
            'string.empty': 'Por favor ingrese dirección',
            'string.min': 'El campo no puede tener menos de 6 caracteres',
            'any.required': 'Por favor ingrese dirección',
        }),

    });

    return schema.validate(data);
}
const requestValidation = (data: any) => {
    const schema = Joi.object({
        professionalid: Joi.string().required(),
        userid: Joi.string().required(),
        practices: Joi.array(),
        //practicesid: Joi.array().required(),
        //prescription: Joi.array().items(Joi.string().base64()),
        comment: Joi.string()
    });
    return schema.validate(data);
}
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.requestValidation = requestValidation; 

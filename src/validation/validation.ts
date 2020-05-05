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
            'string.min': 'El DNI no puede tener menos de 7 caracteres',
            'string.max': 'El DNI no puede tener mas de 9 caracteres',
            'any.required': 'Por favor ingrese el DNI',
        }),
        name: Joi.string().min(2).max(255).required().messages({
            'string.empty': 'Por favor ingrese el Nombre',
            'string.min': 'El Nombre no puede tener menos de 2 caracteres',
            'string.max': 'El Nombre no puede tener mas de 255 caracteres',
            'any.required': 'Por favor ingrese el Nombre',
        }),
        surname: Joi.string().min(2).max(255).required().messages({
            'string.empty': 'Por favor ingrese el Apellido',
            'string.min': 'El Apellido no puede tener menos de 2 caracteres',
            'string.max': 'El Apellido no puede tener mas de 255 caracteres',
            'any.required': 'Por favor ingrese el Apellido',
        }),
        pwd: Joi.string().min(6).required().messages({
            'string.empty': 'Por favor ingrese la clave',
            'string.min': 'El clave no puede tener menos de 6 caracteres',
            'any.required': 'Por favor ingrese la clave',
        }),
        gender: Joi.number().min(1).max(3).required().messages({
            'number.integer': 'El genero debe ser un Id',
            'number.min': 'El valor de genero debe estar entre 1 y 3',
            'number.max': 'El valor de genero debe estar entre 1 y 3',
        }),
        picture: Joi.string().base64().messages({
            'string.base64': 'El campo imagen debe ser base64',
            'any.required': 'Por favor ingrese la imagen',
        }),
        email: Joi.string().min(6).required().email().messages({
            'string.base': 'El email debe ser un string',
            'string.empty': 'Por favor ingrese el email',
            'string.min': 'El email no puede tener menos de 6 caracteres',
            'string.email': 'Debe ingresar un email válido',
            'any.required': 'Por favor ingrese el email',
        }),
        mobile: Joi.string().min(2).required().messages({
            'string.empty': 'Por favor ingrese el telefono',
            'string.min': 'El telefono no puede tener menos de 2 caracteres',
            'any.required': 'Por favor ingrese el telefono',
        }),
        city: Joi.string().min(2).messages({
            'string.empty': 'Por favor ingrese la ciudad',
            'string.min': 'El campo ciudad no puede tener menos de 2 caracteres',
        }),
        address: Joi.string().min(6).messages({
            'string.empty': 'Por favor ingrese dirección',
            'string.min': 'El campo dirección no puede tener menos de 6 caracteres',
            'any.required': 'Por favor ingrese dirección',
        }),

    });

    return schema.validate(data);
}
const registerProfValidation = (data: any) => {
    const schema = Joi.object().keys({
        dni: Joi.string().regex(/^[0-9]+$/).min(7).max(9).required().messages({
            'string.empty': 'Por favor ingrese el DNI',
            'string.pattern.base': 'El DNI solo acepta numeros',
            'string.min': 'El DNI no puede tener menos de 7 caracteres',
            'string.max': 'El DNI no puede tener mas de 9 caracteres',
            'any.required': 'Por favor ingrese el DNI',
        }),
        name: Joi.string().min(2).max(255).required().messages({
            'string.empty': 'Por favor ingrese el Nombre',
            'string.min': 'El Nombre no puede tener menos de 2 caracteres',
            'string.max': 'El Nombre no puede tener mas de 255 caracteres',
            'any.required': 'Por favor ingrese el Nombre',
        }),
        surname: Joi.string().min(2).max(255).required().messages({
            'string.empty': 'Por favor ingrese el Apellido',
            'string.min': 'El Apellido no puede tener menos de 2 caracteres',
            'string.max': 'El Apellido no puede tener mas de 255 caracteres',
            'any.required': 'Por favor ingrese el Apellido',
        }),
        pwd: Joi.string().min(6).required().messages({
            'string.empty': 'Por favor ingrese la clave',
            'string.min': 'El campo clave no puede tener menos de 6 caracteres',
            'any.required': 'Por favor ingrese la clave',
        }),
        gender: Joi.number().min(1).max(3).required().messages({
            'number.integer': 'El genero debe ser un Id',
            'number.min': 'El valor del genero debe estar entre 1 y 3',
            'number.max': 'El valor del genero debe estar entre 1 y 3',
        }),
        picture: Joi.string().base64().messages({
            'string.base64': 'El campo imagen debe ser base64',
            'any.required': 'Por favor ingrese la imagen',
        }),
        email: Joi.string().min(6).required().email().messages({
            'string.base': 'El email debe ser un string',
            'string.empty': 'Por favor ingrese el email',
            'string.min': 'El email no puede tener menos de 6 caracteres',
            'string.email': 'Debe ingresar un email válido',
            'any.required': 'Por favor ingrese el email',
        }),
        mobile: Joi.string().min(2).required().messages({
            'string.empty': 'Por favor ingrese el telefono',
            'string.min': 'El telefono no puede tener menos de 2 caracteres',
            'any.required': 'Por favor ingrese el telefono',
        }),
        city: Joi.string().min(2).messages({
            'string.empty': 'Por favor ingrese la ciudad',
            'string.min': 'El campo ciudad no puede tener menos de 2 caracteres',
        }),
        address: Joi.string().min(6).messages({
            'string.empty': 'Por favor ingrese dirección',
            'string.min': 'El campo dirección no puede tener menos de 6 caracteres',
            'any.required': 'Por favor ingrese dirección',
        }),
        description: Joi.string().optional().allow('').messages({
            'string.empty': 'Por favor ingrese descripción',
        }),
        especialidadid: Joi.number().min(1).required().messages({
            'number.integer': 'El campo especialidadid debe ser un Id',
            'number.min': 'El valor del campo especialidadid debe ser mayor a 0',
        }),
        practicas: Joi.array(),
        certpicture: Joi.string().allow('').base64().messages({
            'string.base64': 'El campo certpicture debe ser base64',
            //'any.required': 'Por favor ingrese la imagen',
        }),
        certnumber: Joi.string().allow('').messages({
            //'string.base64': 'El campo imagen debe ser base64',
            //'any.required': 'Por favor ingrese la imagen',
        }),
        paymethod: Joi.number().min(1).max(2).required().messages({
            'number.integer': 'El paymethod debe ser un vaalor entre 1 y 2',
            'number.min': 'El paymethod debe ser un vaalor entre 1 y 2',
            'number.max': 'El paymethod debe ser un vaalor entre 1 y 2',
        }),
        cbu: Joi.string().allow('').messages({
            'string.base64': 'Debe ingresar un CBU válido',
            //'any.required': 'Por favor ingrese la imagen',
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
        comment: Joi.string().optional().allow(''),
        patienttype: Joi.number().required().min(1).max(4),
        preferenceid: Joi.string().optional().allow(''),
    });
    return schema.validate(data);
}
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.requestValidation = requestValidation;
module.exports.registerProfValidation = registerProfValidation;

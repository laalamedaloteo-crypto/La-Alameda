const Joi = require('joi');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ message: errorMessage });
        }

        next();
    };
};

// Esquemas de validación
const authSchemas = {
    login: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'El formato del email no es válido',
            'any.required': 'El email es obligatorio'
        }),
        password: Joi.string().required().messages({
            'any.required': 'La contraseña es obligatoria'
        })
    }),

    forgotPassword: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'El formato del email no es válido',
            'any.required': 'El email es obligatorio'
        })
    }),

    resetPassword: Joi.object({
        email: Joi.string().email().required(),
        code: Joi.string().length(6).required().messages({
            'string.length': 'El código debe tener 6 dígitos',
            'any.required': 'El código es obligatorio'
        }),
        newPassword: Joi.string().min(6).required().messages({
            'string.min': 'La nueva clave debe tener al menos 6 caracteres',
            'any.required': 'La nueva clave es obligatoria'
        })
    }),

    requestCode: Joi.object({}), // No requiere body, pero se deja por estructura

    changePassword: Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().min(6).required().messages({
            'string.min': 'La nueva clave debe tener al menos 6 caracteres'
        }),
        code: Joi.string().length(6).required()
    })
};

module.exports = {
    validateRequest,
    authSchemas
};

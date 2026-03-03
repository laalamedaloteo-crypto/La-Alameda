const rateLimit = require('express-rate-limit');

// Limitador general para rutas de auth
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 20, // Máximo 20 peticiones por ventana
    message: {
        message: 'Demasiados intentos desde esta IP, por favor intenta de nuevo en 15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Limitador estricto para pedir códigos de verificación
const codeRequestLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5, // Máximo 5 pedidos de código por hora
    message: {
        message: 'Has solicitado demasiados códigos. Por favor, intenta de nuevo en una hora.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    authLimiter,
    codeRequestLimiter
};

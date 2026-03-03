const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const auth = require('../middleware/auth');

const { validateRequest, authSchemas } = require('../middleware/validation');
const { authLimiter, codeRequestLimiter } = require('../middleware/rate-limiter');

router.post('/login', authLimiter, validateRequest(authSchemas.login), authController.login);
router.post('/forgot-password', authLimiter, validateRequest(authSchemas.forgotPassword), authController.forgotPassword);
router.post('/reset-password', authLimiter, validateRequest(authSchemas.resetPassword), authController.resetPassword);

router.post('/request-code', auth, codeRequestLimiter, authController.requestCode);
router.post('/change-password', auth, authLimiter, validateRequest(authSchemas.changePassword), authController.changePassword);

module.exports = router;

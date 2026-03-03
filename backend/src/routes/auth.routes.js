const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const auth = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/request-code', auth, authController.requestCode);
router.post('/change-password', auth, authController.changePassword);

module.exports = router;

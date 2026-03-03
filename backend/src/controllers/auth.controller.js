const User = require('../models/User');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.requestCode = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Generar código de 6 dígitos
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

        user.verificationCode = code;
        user.codeExpires = expires;
        await user.save();

        await emailService.sendVerificationCode(user.email, user.name, code);
        res.json({ message: 'Código enviado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, code } = req.body;
        const user = await User.findByPk(req.userId);

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // 1. Verificar contraseña actual
        if (!(await user.validPassword(currentPassword))) {
            return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
        }

        // 2. Verificar código
        if (!user.verificationCode || user.verificationCode !== code) {
            return res.status(400).json({ message: 'El código de verificación es inválido' });
        }

        // 3. Verificar expiración
        if (new Date() > user.codeExpires) {
            return res.status(400).json({ message: 'El código ha expirado' });
        }

        // 4. Actualizar contraseña y limpiar código
        user.password = newPassword;
        user.verificationCode = null;
        user.codeExpires = null;
        await user.save();

        // Enviar notificación final
        await emailService.sendPasswordChangeNotification(user.email, user.name);

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

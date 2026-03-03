const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendPasswordChangeNotification = async (email, name) => {
    try {
        await resend.emails.send({
            from: 'Inmobiliaria <onboarding@resend.dev>', // Usar este remitente por defecto para testing
            to: email,
            subject: 'Tu contraseña ha sido cambiada',
            html: `
                <h1>Hola ${name},</h1>
                <p>Te informamos que la contraseña de tu cuenta en el Panel de Inmobiliaria ha sido cambiada recientemente.</p>
                <p>Si no realizaste este cambio, por favor contáctanos de inmediato.</p>
                <br>
                <p>Saludos,<br>Equipo de Inmobiliaria</p>
            `
        });
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

exports.sendVerificationCode = async (email, name, code) => {
    try {
        await resend.emails.send({
            from: 'Inmobiliaria <onboarding@resend.dev>',
            to: email,
            subject: 'Tu código de verificación',
            html: `
                <h1>Hola ${name},</h1>
                <p>Tu código de seguridad para cambiar la contraseña es:</p>
                <div style="font-size: 24px; font-weight: bold; background: #f1f5f9; padding: 16px; text-align: center; border-radius: 8px;">
                    ${code}
                </div>
                <p>Este código expira en 15 minutos.</p>
                <p>Si no solicitaste este cambio, por favor ignora este mensaje.</p>
                <br>
                <p>Saludos,<br>Equipo de Inmobiliaria</p>
            `
        });
        console.log(`Verification code sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification code:', error);
    }
};

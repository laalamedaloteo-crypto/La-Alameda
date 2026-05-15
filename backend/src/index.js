const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./models/index');

// Import routes
const authRoutes = require('./routes/auth.routes');
const lotsRoutes = require('./routes/lots.routes');

const app = express();

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [];

if (process.env.NODE_ENV === 'production' && allowedOrigins.length === 0) {
    console.warn('⚠️ ADVERTENCIA: No se han configurado ALLOWED_ORIGINS en producción. Las peticiones externas podrían fallar.');
}

app.use(cors({
    origin: (origin, callback) => {
        // En desarrollo permitimos todo lo que venga de localhost
        const isLocalhost = !origin || origin.startsWith('http://localhost');

        if (isLocalhost || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`❌ Bloqueado por CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma']
}));
app.use(express.json());

// Routes
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    }
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/lots', lotsRoutes);

// Bootstrap Admin User
async function bootstrapAdmin() {
    try {
        const User = require('./models/User');
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.warn('⚠️ ADMIN_EMAIL o ADMIN_PASSWORD no están configurados en el .env');
            return;
        }

        // 1. Intentar encontrar el admin viejo para "migrarlo"
        const oldAdmin = await User.findOne({ where: { email: 'admin@example.com' } });
        if (oldAdmin) {
            oldAdmin.email = adminEmail;
            oldAdmin.password = adminPassword;
            await oldAdmin.save();
            console.log(`✅ Usuario admin migrado de admin@example.com a ${adminEmail}`);
            return;
        }

        // 2. Si no existe el viejo, asegurar que exista el nuevo
        const [user, created] = await User.findOrCreate({
            where: { email: adminEmail },
            defaults: {
                name: 'Admin',
                email: adminEmail,
                password: adminPassword
            }
        });

        if (created) {
            console.log(`✅ Usuario admin creado: ${adminEmail}`);
        } else {
            console.log(`ℹ️ Usuario admin ${adminEmail} ya existe`);
        }

    } catch (error) {
        console.error('❌ Error en bootstrapAdmin:', error);
    }
}

// Database Sync & Server Start
const PORT = process.env.PORT || 3000;

const syncLots = require('./utils/sync-lots');

sequelize.sync({ alter: true })
    .then(async () => {
        console.log('Database connected and synced');
        await bootstrapAdmin();

        // Sincronización automática de lotes (JSON -> DB)
        try {
            await syncLots();
        } catch (err) {
            console.error('⚠️ Falló la sincronización automática de lotes, pero el servidor iniciará igualmente.');
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

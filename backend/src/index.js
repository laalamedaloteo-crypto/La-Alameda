const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./models/index');

// Import routes
const authRoutes = require('./routes/auth.routes');
const lotsRoutes = require('./routes/lots.routes');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:4201'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lots', lotsRoutes);

// Database Sync & Server Start
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

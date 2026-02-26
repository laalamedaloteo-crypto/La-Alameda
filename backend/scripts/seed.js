const sequelize = require('../src/models/index');
const Lot = require('../src/models/Lot');
const User = require('../src/models/User');
const fs = require('fs');
const path = require('path');

async function seed() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced for seeding');

        // Create Admin User
        await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'adminpassword123' // This will be hashed via model hooks
        });
        console.log('Admin user created');

        // Seed Lots from JSON
        const lotsJsonPath = path.join(__dirname, '../../frontend/src/assets/data/lots.json');
        const lotsData = JSON.parse(fs.readFileSync(lotsJsonPath, 'utf8'));

        for (const lot of lotsData) {
            await Lot.create({
                id: lot.id,
                code: lot.code,
                areaM2: lot.areaM2,
                priceUsd: lot.priceUsd,
                status: lot.status,
                polygon: lot.polygon,
                description: '', // Default empty description
                extraData: {}
            });
        }

        console.log(`${lotsData.length} lots seeded successfully`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Lot = sequelize.define('Lot', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    areaM2: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    priceUsd: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('AVAILABLE', 'RESERVED', 'SOLD'),
        allowNull: true,
        defaultValue: null
    },
    polygon: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    extraData: {
        type: DataTypes.JSONB,
        allowNull: true
    }
});

module.exports = Lot;

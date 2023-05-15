// import bcrypt, sequelize, and mysql database connection through sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inventory extends Model { }

// creates our categories for items
Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        items: {
            type: DataTypes.TEXT,
            allowNull: false,
            references: {
                model: 'items',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'inventory',
    }
);

module.exports = Inventory;
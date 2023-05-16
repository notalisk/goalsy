// import bcrypt, sequelize, and mysql database connection through sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item_category extends Model {}

// creates our model for item categories
Item_category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'item_category',
    }
);

module.exports = Item_category;
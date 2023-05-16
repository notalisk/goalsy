// import sequelize and mysql database connection through sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bank extends Model{}

// creates our bank model
Bank.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 30,
        },
        character_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'character',
                key: 'id',
            },
        },
        item_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'item',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'bank',
    }
)

module.exports = Bank;
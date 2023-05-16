// import sequelize and mysql database connection through sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shop extends Model {}

// creates our shop model
Shop.init(
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
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            allowNull: false,
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
        modelName: 'shop',
    }
)

module.exports = Shop;

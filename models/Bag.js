// import sequelize and mysql database connection through sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bag extends Model { }

// creates our bag model
Bag.init(
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
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rarity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'rarity',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'bag',
    }
)

module.exports = Bag;
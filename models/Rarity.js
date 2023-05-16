// import sequelize and mysql database connection through sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rarity extends Model { }

// creates our rarity model
Rarity.init(
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
        modelName: 'rarity',
    },
)

module.exports = Rarity;
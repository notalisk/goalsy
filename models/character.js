// import sequelize and mysql database connection through sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model { }

// creates our character model
Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // avatar: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            // },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        health: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50,
        },
        xp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        gold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        perception: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        intelligence: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        constitution: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'account',
                key: 'id',
            },
        },
        bag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'bag',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'character',
    }
);

module.exports = Character;

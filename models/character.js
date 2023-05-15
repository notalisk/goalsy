const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model { }

Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        inventory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'inventory',
                key: 'id',
            },
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

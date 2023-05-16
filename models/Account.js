// import bcrypt, sequelize, and mysql database connection through sequelize
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// compareSync takes the entered password and compares it against the hashed password
class Account extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// this is our "account" model
Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-zA-Z0-9]+$/i,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
                is: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/i,
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newAccountData) => {
                newAccountData.password = await bcrypt.hash(newAccountData.password, 10);
                return newAccountData;
            },
            beforeUpdate: async (updatedAccountData) => {
                updatedAccountData.password = await bcrypt.hash(updatedAccountData.password, 10);
                return updatedAccountData;
            },
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'account',
    }
);

module.exports = Account;
// import sequelize
const Sequelize = require('sequelize');
// uses .env file to hide sensitive information
require('dotenv').config();

let sequelize;

// links mysql to our database through sequelize
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;

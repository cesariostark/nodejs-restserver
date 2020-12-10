const Sequelize = require('sequelize');
require('../config/config');
const sequelize = new Sequelize(

    process.env.DB,
    process.env.USER_DB,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql',
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require('./usuario.model')(sequelize, Sequelize);

module.exports = db;
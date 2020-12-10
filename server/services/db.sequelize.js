const Sequelize = require('sequelize');

const sequelize = new Sequelize(

    process.env.BD,
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
const Sequelize = require('sequelize');

const sequelize = new Sequelize(

    'transapp',
    'root',
    'password',
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require('./usuario.model')(sequelize, Sequelize);

module.exports = db;
const { sequelize, Sequelize } = require("./db.sequelize");

module.exports = (sequelize, Sequelize) => {

    const usuario = sequelize.define('usuario', {

        rut: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        nombre: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        contraseña: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        comuna: {
            type: Sequelize.STRING
        },
        centro_costo_1: {
            type: Sequelize.STRING
        },
        centro_costo_2: {
            type: Sequelize.STRING
        },
        roles_id_Roles: {
            type: Sequelize.INTEGER,
            defaultValue: 3
        }
    }, 
    {
        sequelize,
        freezeTableName: true,
        createdAt: false,
        updateAt: false,

    });

    return usuario;
}
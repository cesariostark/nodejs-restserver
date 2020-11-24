const { result } = require('underscore');
const pool = require('../config/db');

const crearPersonal = (data, callBack) => {
    
    pool.query(`INSERT INTO personal (rut, nombre, email, contraseña, isAdmin) values(?, ?, ?, ?, ?)`,
    [data.rut, data.nombre, data.email, data.password, data.isAdmin], 
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}

module.exports = {
    crearPersonal
}
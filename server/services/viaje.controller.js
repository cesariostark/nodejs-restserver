const pool = require('../config/db');


// ======================
// QUERYS VIAJES
// ======================

const obtenerViaje = (data, cb) => {

    pool.query('SELECT * FROM viaje', (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

const obtenerViajePorID = (id, cb) => {

    pool.query('')
}

const crearViaje = (data, cb) => {


    pool.query('INSERT INTO viaje(solicitante, conductor) VALUES (?,?) ',
    [data.solicitante, data.conductor],
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}

module.exports = {
    crearViaje
}

const pool = require('../config/db');

//Query para agregar usuarios a tabla Pasajero
const crearPasajero = (data, callBack) => {
    
    pool.query(`INSERT INTO pasajero (rut, nombre, email, contraseña, direccion, comuna, centro_costo_1, centro_costo_2) values(?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.rut, data.nombre, data.email, data.password, data.direccion, data.comuna, data.costo1, data.costo2], 
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}

//Query para obtener un usuario por id(rut) de la tabla Pasajero
const getPasajeroById = (rut, callBack) => {

    pool.query(`SELECT rut, nombre, email, direccion, comuna, centro_costo_1, centro_costo_2 from pasajero where rut = ?`, 
    [rut],
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

//Query para obtener todos los usuarios de la tabla Pasajero
const getAllPasajero = (callBack) => {

    pool.query(`SELECT * FROM pasajero`, (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

//Query para actualizar registros de un usuario mediante id(rut) de la tabla Pasajero
const updatePasajero = (data, callBack) => {

    pool.query(`UPDATE pasajero set nombre=?, email=?, contraseña=?, direccion=?, comuna=?, centro_costo_1=?, centro_costo_2=? where rut = ?`, 
    [
        data.nombre,
        data.email,
        data.password,
        data.direccion,
        data.comuna,
        data.costo1,
        data.costo2,
        data.rut
    ],
    (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

//Query para eliminar un registros de un usuario mediante id(rut) de la tabla personal
const deletePasajero = (data, callBack) => {

    pool.query(`delete from pasajero where rut = ?`, 
    [data.rut],
    (error, results, fields) =>{
        if (error) {
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

module.exports = {
    crearPasajero,
    getPasajeroById,
    getAllPasajero,
    updatePasajero,
    deletePasajero
}
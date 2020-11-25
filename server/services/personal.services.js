
const pool = require('../config/db');

//Query para agregar usuarios a tabla personal
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

//Query para obtener un usuario por id(rut) de la tabla personal
const getPersonalById = (rut, callBack) => {

    pool.query(`SELECT rut, nombre, email, contraseña, isAdmin from personal where rut = ?`, 
    [rut],
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

//Query para obtener todos los usuarios de la tabla personal
const getAllPersonal = (callBack) => {

    pool.query(`SELECT * FROM personal`, (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

//Query para actualizar registros de un usuario mediante id(rut) de la tabla personal
const updatePersonal = (data, callBack) => {

    pool.query(`UPDATE personal set nombre=?, email=?, contraseña=? where rut = ?`, 
    [
        data.nombre,
        data.email,
        data.password,
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
const deletePersonal = (data, callBack) => {

    pool.query(`delete from personal where rut = ?`, 
    [data.rut],
    (error, results, fields) =>{
        if (error) {
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

module.exports = {
    crearPersonal,
    getPersonalById,
    getAllPersonal,
    updatePersonal,
    deletePersonal
}
const pool = require('../config/db');


// =================
// QUERYS ADMIN
// =================

// Crear admin
const crearAdministrador = (data, callBack) => {
    
    pool.query(`INSERT INTO usuario (rut, nombre, email, contraseña, roles_id_Roles) values(?, ?, ?, ?, 1)`,
    [data.rut, data.nombre, data.email, data.password], 
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}

// Obtener admin por rut
const obtenerAdministradorPorRut = (rut, callBack) => {

    pool.query(`SELECT rut, nombre, email, from usuario where rut = ? AND roles_id_Roles = 1`, 
    [rut],
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

// Obtener todos los administradores
const obtenerAdministradores = (callBack) => {

    pool.query(`SELECT * FROM usuario where roles_id_Roles = 1`, (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

// Actualizar admin
const actualizarAdmin = (data, callBack) => {

    pool.query(`UPDATE usuario set nombre=?, email=?, contraseña=? where rut = ?`, 
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
        return callBack(null, results);
    });
}


// =================
// QUERYS CONDUCTOR
// =================

// Crear conductor
const crearConductor = (data, callBack) => {
    
    pool.query(`INSERT INTO usuario (rut, nombre, email, contraseña, roles_id_Roles) values(?, ?, ?, ?, 2)`,
    [data.rut, data.nombre, data.email, data.password], 
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}

// Obtener conductor por rut
const obtenerConductorPorRut = (rut, callBack) => {

    pool.query(`SELECT rut, nombre, email, from usuario where rut = ? AND roles_id_Roles = 2`, 
    [rut],
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

// Obtener todos los conductores
const obtenerConductores = (callBack) => {

    pool.query(`SELECT * FROM usuario where roles_id_Roles = 2`, (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

// Actualizar conductor
const actualizarConductor = (data, callBack) => {

    pool.query(`UPDATE usuario set nombre=?, email=?, contraseña=? where rut = ?`, 
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

// =================
// QUERYS PASAJERO
// =================

// Crear un pasajero
const crearPasajero = (data, callBack) => {
    
    pool.query(`INSERT INTO usuario (rut, nombre, email, contraseña, direccion, comuna, centro_costo_1, centro_costo_2, roles_id_Roles) values(?, ?, ?, ?, ?, ?, ?, ?, 3)`,
    [data.rut, data.nombre, data.email, data.password, data.direccion, data.comuna, data.costo1, data.costo2], 
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}

// Obtener pasajero por rut
const obtenerPasajeroPorRut = (rut, callBack) => {

    pool.query(`SELECT rut, nombre, email, direccion, comuna, centro_costo_1, centro_costo_2 from usuario where rut = ?`, 
    [rut],
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

// Obtener todos los pasajeros
const obtenerPasajeros = (callBack) => {

    pool.query(`SELECT * from usuario where roles_id_Roles = 3`,
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

// Actualizar pasajero
const actualizarPasajero = (data, callBack) => {

    pool.query(`UPDATE usuario set nombre=?, email=?, contraseña=?, direccion=?, comuna=?, centro_costo_1=?, centro_costo_2=? where rut=? AND roles_id_Roles=3`, 
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

// =================
// QUERY GLOBAL
// =================

// Eliminar usuario
const eliminarUsuario = (data, callBack) => {

    pool.query(`DELETE FROM usuario WHERE rut=?`, 
    [data],
    (error, results, fields) =>{
        if (error) {
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

//Eliminar todos los usuarios pasajeros

const eliminarPasajeros = (callBack) => {

    pool.query(`DELETE FROM usuario where roles_id_Roles=3`, (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

// Obtener rut y contraseña para login y generación de TOKEN
const obtenerUsuarioPorRut = (rut, callBack) => {

    pool.query(`SELECT * FROM usuario where rut=?`, 
    [rut],
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}
module.exports = {
    crearAdministrador,
    obtenerAdministradorPorRut,
    obtenerAdministradores,
    actualizarAdmin,
    crearConductor,
    obtenerConductorPorRut,
    obtenerConductores,
    actualizarConductor,
    crearPasajero,
    obtenerPasajeroPorRut,
    obtenerPasajeros,
    actualizarPasajero,
    eliminarUsuario,
    obtenerUsuarioPorRut,
    eliminarPasajeros
}
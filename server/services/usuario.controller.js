const connection = require('../config/db');


// =================
// QUERYS ADMIN
// =================

// Crear admin
const crearAdministrador = (data, callBack) => {
    
    connection.query(`INSERT INTO usuario (rut, nombre, email, contraseña, roles_id_Roles) values(?, ?, ?, ?, 1)`,
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

    connection.query(`SELECT rut, nombre, email, from usuario where rut = ? AND roles_id_Roles = 1`, 
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

    connection.query(`SELECT * FROM usuario where roles_id_Roles = 1`, (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

// Actualizar admin
const actualizarAdmin = (data, callBack) => {

    connection.query(`UPDATE usuario set nombre=?, email=?, contraseña=? where rut = ?`, 
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
// QUERYS CONDUCTOR
// =================

// Crear conductor
const crearConductor = (data, callBack) => {
    
    connection.query(`INSERT INTO usuario (rut, nombre, email, contraseña, roles_id_Roles) values(?, ?, ?, ?, 2)`,
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

    connection.query(`SELECT rut, nombre, email, from usuario where rut = ? AND roles_id_Roles = 2`, 
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

    connection.query(`SELECT * FROM usuario where roles_id_Roles = 2`, (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

// Actualizar conductor
const actualizarConductor = (data, callBack) => {

    connection.query(`UPDATE usuario set nombre=?, email=?, contraseña=? where rut = ?`, 
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
    
    connection.query(`INSERT INTO usuario (rut, nombre, email, contraseña, direccion, comuna, centro_costo_1, centro_costo_2, roles_id_Roles) values(?, ?, ?, ?, ?, ?, ?, ?, 3)`,
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

    connection.query(`SELECT rut, nombre, email, direccion, comuna, centro_costo_1, centro_costo_2 from usuario where rut = ?`, 
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

    connection.query(`SELECT * from usuario where roles_id_Roles = 3`,
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

// Actualizar pasajero
const actualizarPasajero = (data, callBack) => {

    connection.query(`UPDATE usuario set nombre=?, email=?, contraseña=?, direccion=?, comuna=?, centro_costo_1=?, centro_costo_2=? where rut=? AND roles_id_Roles=3`, 
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

    connection.query(`DELETE FROM usuario WHERE rut=?`, 
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

    connection.query(`DELETE FROM usuario where roles_id_Roles=3`, (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results[0]);
    });
}

// Obtener rut y contraseña para login y generación de TOKEN
const obtenerUsuarioPorRut = (rut, callBack) => {

    connection.query(`SELECT * FROM usuario where rut=?`, 
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
/* const pool = require('../config/db');
const query = 'SELECT viaje.fecha_hora,viaje.solicitante,usuario.nombre,usuario.rut,usuario.direccion,usuario.comuna,usuario.centro_costo_1,usuario.centro_costo_2,viaje.conductor,viaje.detalle FROM viaje JOIN usuario_has_viaje ON id_viaje=usuario_has_viaje.viaje_id_viaje JOIN usuario ON usuario.rut=usuario_has_viaje.usuario_rut'
// FECHA

let año = new Date().getFullYear();
let mes = new Date().getMonth()+1;
let dia = new Date().getUTCDate();
let hora = new Date().getHours()
let mins = new Date().getMinutes();
let secs = new Date().getSeconds();

let fecha = `${año}-${mes}-${dia} ${hora}:${mins}:${secs}`;

// ======================
// QUERYS VIAJES
// ======================

const obtenerViaje = (callBack) => {

    pool.query(query, 
    (error, results, fields) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results);
    });
}

const obtenerViajePorID = (id, callBack) => {

    pool.query(query + 'WHERE id=?', 
    [id],
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results[0]);
    })
}

const crearViaje = (data, callBack) => {

    pool.query(`INSERT INTO viaje (fecha_hora, solicitante, conductor, detalle) VALUES(?,?,?, null)`,
    [fecha, data.solicitante, data.conductor],
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}

const usuarioTieneViaje = (data, callBack) => {

    pool.query('INSERT INTO pasajero_has_viaje(usuario_rut, id_viaje) VALUES (?,?)', 
    [data.rut, data.id],
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results)
    })
}

const eliminarTieneViaje = (data, callBack) => {
    
    pool.query('DELETE FROM usuario_has_viaje WHERE usuario_rut=?', 
    [data.rut], 
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results[0]);
    });
}

module.exports = {
    obtenerViaje,
    obtenerViajePorID,
    crearViaje,
    usuarioTieneViaje,
    eliminarTieneViaje
}
 */
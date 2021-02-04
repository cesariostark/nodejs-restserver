const pool = require('../config/db');
/* const query = 'SELECT reporte.fecha_hora, reporte.solicitante, usuario.nombre, usuario.rut,' + 
            'usuario.direccion, usuario.comuna, usuario.centro_costo_1, usuario.centro_costo_2, '+ 
            'reporte.conductor FROM reporte JOIN usuario ON usuario.rut=reporte.rut_usuario '; */

const query = "SELECT reporte.fecha_hora, reporte.solicitante, usuario.nombre, usuario.rut, usuario.direccion, usuario.comuna, usuario.centro_costo_1, usuario.centro_costo_2, reporte.conductor FROM reporte JOIN usuario ON usuario.rut=reporte.rut_usuario";
// FECHA

/* let año = new Date().getFullYear();
let mes = new Date().getMonth()+1;
let dia = new Date().getUTCDate();
let hora = new Date().getHours()
let mins = new Date().getMinutes();
let secs = new Date().getSeconds();

let fecha = `${año}-${mes}-${dia} ${hora}:${mins}:${secs}`;
console.log(fecha); */
// ======================
// QUERYS Reportes
// ======================

const obtenerReportePorFecha = (data, callBack) => {

    let hora_desde = ' 08:00:00';
    let hora_hasta = ' 07:59:59';
    
    pool.query(query + ` WHERE reporte.fecha_hora BETWEEN ? AND ?`,
    [data.fechai+hora_desde, data.fechaf+hora_hasta],
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results[0]);
    })
}

const crearReporte = (data, callBack) => {

    pool.query(`INSERT INTO reporte (fecha_hora, solicitante, rut_usuario, conductor) VALUES(?,?,?,?)`,
    [data.fecha, data.solicitante, data.rut_usuario, data.conductor],
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}



module.exports = {
    obtenerReportePorFecha,
    crearReporte
}

const express = require('express');

const reporte = require('../services/reporte.controller');
const app = express();


//Obtener viaje por fecha
app.put('/reporte', (req, res) => {

    let body = req.body;

    reporte.obtenerReportePorFecha(body, (error, results) => {

        if(error){
            console.log(error)
            return error;
        }
        if(!results){
            return res.json({
                success: 0,
                mensaje: 'No existen reportes en la base de datos'
            });
        }
        res.json({
            success: 1,
            data: results
        });
    });

});


//Crea reporte
app.post('/crear', (req, res) => {

    const data = req.body;
    reporte.crearReporte(data, (error, results) => {
        if(error) {
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: 'Error en la base de datos'
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
            message: 'Reporte creado'
        });
    });
});

module.exports = app;
/* const express = require('express');

const viaje = require('../services/viaje.controller');
const app = express();


//Obtener viaje por ID
app.get('/viaje', (req, res) => {


});

//Obtener todos los viajes
app.get('/viaje', (req, res) => {


    viaje.obtenerViaje((error, results) => {

        if(error){
            console.log(error)
            return error;
        }
        if(!results){
            return res.json({
                success: 0,
                mensaje: 'No existen viajes en la base de datos'
            });
        }
        res.json({
            success: 1,
            data: results
        });
    });
});

//Crea viaje
app.post('/viaje/crear', (req, res) => {

    const data = req.body;
    viaje.crearViaje(data, (error, results) => {
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
            message: 'Viaje creado creado'
        });
    });
});

module.exports = app; */
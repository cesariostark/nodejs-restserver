const express = require('express');
const services = require('../services/pasajero.services');
const bcrypt = require('bcrypt');


const app = express();



//Listar todos los pasajeros
app.get('/pasajero', (req, res) => {

    services.getAllPasajero((error, results) => {

        if (error) {
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: 'No existen pasajeros en la base de datos.'
            });
        }

        return res.json({
            success: 1,
            data: results
        });
    });
});


//Listar pasajero por rut
app.get('/pasajero/:rut', (req, res) => {

    let rut = req.params.rut;
    services.getPasajeroById(rut, (error, results) => {

        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: "Usuario no encontrado"
            });
        }
        return res.json({
            success: 1,
            data: results
        });
    });
});


//Crear un usuario pasajero.
app.post('/personal', (req, res) => {
    
    let body = req.body;
    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    services.crearPasajero(body, (error, results) => {

        if(error) {
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: 'Database connection server error'
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
            message: 'Usuario creado'
        });
    });
});

//Actualizar datos de un personal.
app.patch('/pasajero', (req, res) => {
    
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    services.updatePasajero(body, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: 'Fallo al actualizar usuario'
            });
        }
        return res.json({
            success: 1,
            message: 'Usuario actualizado correctamente'
        });
    });

});

//Eliminar datos de un usuario de la tabla personal

app.delete('/pasajero', (req, res) => {
    
    const data = req.body;
    services.deletePasajero(data, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: 'Usuario no encontrado'
            })
        }
        return res.json({
            success: 1,
            message: 'Usuario eliminado correctamente'
        })
    })
});

module.exports = app;

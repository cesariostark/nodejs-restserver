const express = require('express');
const services = require('../services/personal.services');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const conecction = require('../config/db');


const app = express();


//Listar todo el personal
app.get('/personal', (req, res) => {

    services.getAllPersonal((error, results) => {

        if (error) {
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: 'No existe personal en la base de datos.'
            });
        }

        return res.json({
            success: 1,
            data: results
        });
    });
});


//Listar personal por rut
app.get('/personal/:rut', (req, res) => {

    let rut = req.params.rut;
    services.getPersonalById(rut, (error, results) => {

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


//Crear un usuario de personal.
app.post('/personal', (req, res) => {
    
    let body = req.body;
    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    services.crearPersonal(body, (error, results) => {

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
app.patch('/personal/', (req, res) => {
    
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    services.updatePersonal(body, (error, results) => {
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

app.delete('/personal', (req, res) => {
    
    const data = req.body;
    services.deletePersonal(data, (error, results) => {
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
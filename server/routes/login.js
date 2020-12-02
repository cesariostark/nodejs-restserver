const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuario = require('../services/usuario.controller');


const app = express();

app.post('/login', (req, res) => {

    const body = req.body;
    
    if(!(body.rut && body.password)){
        return res.json({
            success: 0,
            message: 'Se requieron los campos rut y/o contraseña'
        });
    }
    usuario.obtenerUsuarioPorRut(body.rut, (error, results) => {

        
        if (error) {
            console.log(error);
        }
        if (!results) {
            return res.json({
                success: 0,
                data: 'Rut y/o contraseña incorrectos'
            });
        }
        const result = bcrypt.compareSync(body.password, results.contraseña);
        if (result) {
            results.contraseña = undefined;
            const token = jwt.sign({result: results}, process.env.TOKEN, {expiresIn: '4h'});
            if(results.roles_id_Roles === 1){
                res.json({
                    success: 1,
                    message: 'Inicio de sesión exitoso',
                    token
                });
                console.log('Usuario administrador')

            } else if (results.roles_id_Roles === 2){
                res.json({
                    success: 1,
                    message: 'Inicio de sesión exitoso',
                    token
                });
                console.log('Usuario conductor')
            } else if (results.roles_id_Roles === 3){
                res.json({
                    success: 1,
                    message: 'Inicio de sesión exitoso',
                    token
                });
                console.log('Usuario pasajero')
            }
        }
        
    });
});

module.exports = app;


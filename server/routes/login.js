const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Driver = require('../models/conductor');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Driver.findOne({email: body.email}, (err, driverDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if (!driverDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }
        //Comparo contraseñas y se encriptan
        if(!bcrypt.compareSync(body.password, driverDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'contraseña incorrecta'
                }
            });
        }
        //Genero token, con una caducidad de tiempo
        let token = jwt.sign({
            conductor: driverDB
        }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRES});
        
        res.json({
            ok: true, 
            conductor: driverDB,
            token
        });
    });
});

module.exports = app;
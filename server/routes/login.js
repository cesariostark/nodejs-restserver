const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Driver = require('../models/conductor');
const Passenger = require('../models/pasajero');
const app = express();

app.post('/login/conductor', (req, res) => {

    let body = req.body;

    Driver.findOne({email: body.email}, (err, driverDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
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

app.post('/login/pasajero', (req, res) => {

    let body = req.body;

    Passenger.findOne({email: body.email}, (err, pasajeroDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (!pasajeroDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }
        //Comparo contraseñas y se encriptan
        if(!bcrypt.compareSync(body.password, pasajeroDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'contraseña incorrecta'
                }
            });
        }
        //Genero token, con una caducidad de tiempo
        let token = jwt.sign({
            pasajero: pasajeroDB
        }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRES});
        
        res.json({
            ok: true, 
            pasajero: pasajeroDB,
            token
        });
    });
});
module.exports = app;
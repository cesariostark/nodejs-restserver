const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const verifToken = require('../middlewares/auth');
const Passenger = require('../models/pasajero');


// ========================
// Listar todos pasajeros
// ========================

app.get('/pasajero', (req, res) => {

    let body = req.body;

    Passenger.find({})
        .exec((err, pasajeros) => {
            if (err) {
                return res.status(400).json({

                });
            }
            res.json({
                ok: true,
                pasajeros
            });
        });
});

// ========================
// Listar pasajeros por rut
// ========================

//app.get('/pasajero/:run')


// ========================
// Crear un pasajero
// ========================

app.post('/pasajero', (req, res) => {

    let body = req.body;

    let passenger = new Passenger({
        run: body.run,
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        direccion: body.direccion,
        comuna: body.comuna
    });
    passenger.save((err, pasajeroDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            pasajero: pasajeroDB
        })
    })
});

// =============================
// Modificar un pasajero por run
// =============================

app.put('/pasajero/:run', (req, res) => {

    let run = req.params.run;
    let body = _.pick(req.body, ['run', 'nombre', 'apellido', 'email', 'direccion', 'comuna']);

    Passenger.findByIdAndUpdate(run, body, { new: true, runValidators: true }, (err, pasajeroDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            pasajero: pasajeroDB
        })
    })

});


// =============================
// Eliminar un pasajero por run
// =============================

app.delete('/pasajero/:run', verifToken, (req, res) => {


    let run = req.params.run;


    // Usuario.findByIdAndRemove(id, (err, usuarioDelete) => {
    Passenger.findByIdAndRemove(run, (err, pasajeroDelete) => {

        let run = req.params.run;


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!pasajeroDelete) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "Pasajero no encontrado"
                }
            })
        }

        res.json({
            ok: true,
            pasajeroDelete
        })
    })
})
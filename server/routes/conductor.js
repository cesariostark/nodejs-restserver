const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Conductor = require('../models/conductor');
const {verifToken} = require('../middlewares/auth');



app.get('/conductor', (req, res) => {

    Conductor.find({})
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                usuarios
            });
        });
});

app.post('/conductor', (req, res) => {
    let body = req.body;

    let conductor = new Conductor({
        run: body.run,
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        direccion: body.direccion,
        comuna: body.comuna
    });

    conductor.save((err, driverDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            conductor: driverDB
        })
    })

})

app.put('/conductor/:run', verifToken, (req, res) => {

    let run = req.params.run;
    let body = _.pick(req.body, ['run', 'nombre', 'apellido', 'email', 'direccion', 'comuna']);

    Conductor.findByIdAndUpdate(run, body, { new: true, runValidators: true }, (err, driverDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            conductor: driverDB
        })
    })
})

app.delete('/conductor/:run', verifToken, (req, res) => {


    let run = req.params.run;


    // Usuario.findByIdAndRemove(id, (err, usuarioDelete) => {
    Conductor.findByIdAndRemove(run, (err, driverDelete) => {

        let run = req.params.run;


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!driverDelete) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "Conductor no encontrado"
                }
            })
        }

        res.json({
            ok: true,
            driverDelete
        })
    })
})


module.exports = app;
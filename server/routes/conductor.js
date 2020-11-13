const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Conductor = require('../models/conductor');
const {verifToken} = require('../middlewares/auth');



app.get('/conductor', (req, res) => {

 


    Usuario.find({})
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
            })
        })
})

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
            usuario: driverDB
        })
    })

})

// app.put('/conductor/:id', verifToken, (req, res) => {

//     let id = req.params.id;

//     Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             })
//         }

//         res.json({
//             ok: true,
//             usuario: usuarioDB
//         })
//     })
// })

app.delete('/conductor/:id', verifToken, (req, res) => {


    let id = req.params.id;


    // Usuario.findByIdAndRemove(id, (err, usuarioDelete) => {
    Usuario.findByIdAndUpdate(id, { new: true }, (err, driverDelete) => {

        let id = req.params.id;


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioDelete) {

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
const express = require('express');
const services = require('../services/personal.services');
const bcrypt = require('bcrypt');

const app = express();




app.get('/personal', (req, res) => {

});

app.post('/personal', (req, res) => {
    
    let body = req.body;
    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    services.crearPersonal(body, (error, results) => {

        if(error) {
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: 'Database connection server'
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
});

// app.put('/conductor/:run', verifToken, (req, res) => {


// })

// app.delete('/conductor/:run', verifToken, (req, res) => {



// })


module.exports = app;
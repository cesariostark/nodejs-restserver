const express = require('express');

const app = express();


app.get('/welcome', (req, res) => {

    res.send('BIENVENIDOS A TRANSAPP');
});

module.exports = app;
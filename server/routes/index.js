const express = require('express');

const app = express();

// app.use(require('./login'));
app.use(require('./personal'));
app.use(require('./pasajero'));
app.use(require('./upload'));


module.exports = app;
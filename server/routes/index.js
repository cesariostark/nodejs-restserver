const express = require('express');

const app = express();

app.use(require('./bienvenida'));
app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./upload'));
// app.use(require('./viaje'));


module.exports = app;
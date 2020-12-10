const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const db = require('./services/db.sequelize')
require('./config/config');

global.__basedir = __dirname + '/..';

//cors
app.use(cors());

//MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())


//Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../src')));

//Config global de rutas
app.use(require('./routes/index'))


db.sequelize.sync();

app.listen(process.env.PORT, () => {
    console.log('ejecutando desde el puerto 3000')
})
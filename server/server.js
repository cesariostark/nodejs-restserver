const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
require('./config/config')

const moongose = require('mongoose')
const path = require('path');

app.use(cors());
//MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../src')));

//Config global de rutas
app.use(require('./routes/index'))


moongose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {

        // useUnifiedTopology: true
        // useNewUrlParser: true
        if (err) throw err;

        console.log('BD Online')
    });
app.listen(process.env.PORT, () => {
    console.log('ejecutando desde el puerto 3000')
})
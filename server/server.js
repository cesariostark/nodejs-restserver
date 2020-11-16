const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
require('./config/config')

const moongose = require('mongoose')
const path = require('path');

<<<<<<< HEAD
<<<<<<< HEAD
//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


=======
app.use(cors());
>>>>>>> 330b75455fcd7db1bd09415c618dc307e05c9b80
=======
app.use(cors());
>>>>>>> 330b75455fcd7db1bd09415c618dc307e05c9b80
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
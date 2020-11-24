const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
require('./config/config')
const pool = require('./config/db')
const path = require('path');

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

// pool.co
// //conexion a BD
// db.connect(function(err){
//     if (err) throw console.error('Connection error: ' + err)
//     else{ console.log('Connected as id: ' + db.threadId)}
// });

app.listen(process.env.PORT, () => {
    console.log('ejecutando desde el puerto 3000')
})
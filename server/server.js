const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./config/config')

const moongose = require('mongoose')


//MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'))


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
//Modelo de datos

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



//Comando para la creación de esquemas en Mongo

let Schema = mongoose.Schema;

let driverSchema = new Schema({

    run: {
        type: String,
        required: [true, 'El RUN es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es necesaria']
    },
    comuna: {
        type: String,
        required: [true, 'La comuna es necesaria']
    }

});

//No debe haber usuarios repetidos
driverSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('Driver', driverSchema);
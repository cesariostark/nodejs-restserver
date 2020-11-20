//Modelo de datos

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { unique } = require('underscore');


//Esquema

let Schema = mongoose.Schema;

let passengerSchema = new Schema({

    run: {
        type: String,
        required: [true, 'El RUN es necesario'],
        unique: true
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
        required: [true, 'El email es necesario'],
        true: unique
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

passengerSchema.plugin(uniqueValidator, '{PATH} debe ser único');

module.exports = mongoose.model('Passenger', passengerSchema);

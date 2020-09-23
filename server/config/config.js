//process objeto global que corre en node.js


//====================================
//  Puerto
//====================================

//Si el puerto no existe nosotros damos el valor
process.env.PORT = process.env.PORT || 3000;



//====================================
//  Entorno
//====================================

//Me permite si lo levanto en producción, o en cualquier proceso de Node
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================================
//  Base de Datos
//====================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
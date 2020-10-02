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
//  Vencimiento del Token
//====================================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//====================================
//  SEED de auth
//====================================

process.env.SEED = process.env.SEED || 'este-es-el-seed';
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

//====================================
//  Google Client ID
//====================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '291432508091-8p0fk9ndu13pdemu7kuk3rmcknpa66e6.apps.googleusercontent.com'
//process objeto global que corre en nodejs


// =====================================
// PUERTO
// =====================================

//Si el puerto no existe nosotros le damos el valor
process.env.PORT = process.env.PORT || 3000;

// ================================
// ENTORNO 
// ===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'Devs';

// ===============================
// TOKEN
// ===============================
process.env.TOKEN = process.env.TOKEN || 'Token-Auth';


// ===============================
// BASE DE DATOS
// ===============================
 
process.env.HOST = process.env.HOST || 'localhost'
process.env.USER_DB = process.env.USER_DB || 'root'
process.env.PASSWORD = process.env.PASSWORD || 'password'
process.env.DB = process.env.DB || 'transapp'
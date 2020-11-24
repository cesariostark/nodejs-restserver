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

process.env.TOKEN_EXPIRES = '48h';

//====================================
//  SEED de auth
//====================================

process.env.SEED = process.env.SEED || 'este-es-el-seed';
//====================================
//  Base de Datos
//====================================


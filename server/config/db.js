const mysql = require('mysql');

//Conexion a BD local
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  insecureAuth: true
});


//conexion heroku
/* const pool = mysql.createPool({
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'bf22a30332897b',
  password: 'b16e137c',
  database: 'heroku_fd294c00043b63f',
  insecureAuth: true
}); */

module.exports = pool;
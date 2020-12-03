const mysql = require('mysql');

//Conexion a BD local
const pool = mysql.createPool({
  host: 'de1tmi3t63foh7fa.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'h1dnajsq6r2gyute',
  password: 'mudiro4d6q3a1y0v',
  database: 'mzf63cxl54rnezbh',
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
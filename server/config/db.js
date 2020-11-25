const mysql = require('mysql');

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'transapp',
    insecureAuth: true
  });

module.exports = pool;


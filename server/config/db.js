const mysql = require('mysql');

const pool = mysql.createPool({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DB,
    insecureAuth: true
  });

module.exports = pool;


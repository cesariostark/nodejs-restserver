const mysql = require('mysql');

const pool = mysql.createPool({
    host     : 'us-cdbr-east-02.cleardb.com',
    user     : 'bf22a30332897b',
    password : 'b16e137c',
    database : 'heroku_fd294c00043b63f',
    insecureAuth: true
  });

module.exports = pool;


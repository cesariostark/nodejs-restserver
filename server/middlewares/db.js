const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'us-cdbr-east-02.cleardb.com',
    user     : 'bf22a30332897b',
    password : 'b16e137c',
    database : 'heroku_fd294c00043b63f',
    insecureAuth: true
  });

module.exports = connection;
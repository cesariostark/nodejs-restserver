const mysql = require('mysql');

//Conexion a BD local
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: process.env.DB,
  insecureAuth: true
});


//conexion heroku
/* const connection = mysql.createconnection({
  host: 'de1tmi3t63foh7fa.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'h1dnajsq6r2gyute',
  password: 'mudiro4d6q3a1y0v',
  database: 'mzf63cxl54rnezbh',
  insecureAuth: true
}); */

module.exports = connection;
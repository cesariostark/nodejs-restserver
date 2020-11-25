const { result } = require('underscore');
const pool = require('../config/db');

const crearPersonal = (data, callBack) => {
    
    pool.query(`INSERT INTO personal (rut, nombre, email, contraseña, isAdmin) values(?, ?, ?, ?, ?)`,
    [data.rut, data.nombre, data.email, data.password, data.isAdmin], 
    (error, results, fields) => {
        if(error){
            return callBack(error)
        }
        return callBack(null, results);
    });
}

// app.post('/personal', function(req, res)
// {
//     var data = JSON.parse(req.body.data);
//     var nombre = data.nombre;
//     var run = data.run;
//     var email = data.email;
//     var contrasena = data.contrasena;
//     var isAdmin = data.isAdmin;
//     conecction.connect(function(){
//         var query = "insert into personal (run, nombre, email, contraseña, isAdmin) values ('"+run+"','"+nombre+"','"+email+"','"+contrasena+"','"+isAdmin+"')";
//         conecction.query(query, function( err, result, field){
//             if(err){
//                 res.end(JSON.stringify(err));
//             }else{
//                 if(result.affectedRows > 0){
//                     res.end("succes insert");
//                 } else {
//                     res.end("error intenta de nuevo");
//                 }
//             }
//         });

//     })
// })

module.exports = {
    crearPersonal
}
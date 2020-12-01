const jwt = require('jsonwebtoken');



//============================
// Verificar token
//============================

//next -> continua con la ej del programa
let verifToken = (req, res, next) => {

    let token = req.get('authorization');

    if(token){
        token = token.slice(7);
        jwt.verify(token, process.env.TOKEN, (err, decoded) => {
            if(err){
                res.json({
                    success:0,
                    message: 'Token inválido'
                });
            }else{
                next();
            }
        });
    }else{
        res.json({
            success: 0,
            message: 'Acceso denegado, usuario no autorizado'
        });
    }
}


// let verificarRole = (req, res, next) => {

//     let body = req.body;


// }

module.exports = {
    verifToken
}
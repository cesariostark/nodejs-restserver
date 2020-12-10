const jwt = require('jsonwebtoken');



//============================
// Verificar token
//============================

//next -> continua con la ej del programa
let verifToken = (req, res, next) => {

    let token = req.get('token');
    
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
}


// let verificarRole = (req, res, next) => {

//     let body = req.body;


// }

module.exports = {
    verifToken
}
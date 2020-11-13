const jwt = require('jsonwebtoken');


//============================
// Verificar token
//============================

//next -> continua con la ej del programa
let verifToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.conductor = decoded.conductor;
        next();
    });

}

module.exports = {
    verifToken
}
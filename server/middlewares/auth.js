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

        req.usuario = decoded.usuario;
        next();
    });

}

//============================
// Verificar AdminRole
//============================

let verifTokenRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: true,
            error: {
                message: 'el usuario no es administrador'
            }
        })
    }
}

module.exports = {
    verifToken,
    verifTokenRole
}
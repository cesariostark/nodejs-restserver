const express = require('express');
const bcrypt = require('bcrypt');
const usuario = require('../services/usuario.controller');
const {verifToken} = require('../middlewares/auth');
const app = express();

// ===================================
// API REST USUARIO ADMINISTRADOR
// ===================================

// Obtener usuarios administradores
app.get('/usuario/administrador', (req, res) => {

    usuario.obtenerAdministradores((error, results) => {

        if (error) {
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: 'No existen administradores en la base de datos'
            });
        }
        return res.json({
            success: 1, 
            data: results
        });
    });
});

// Obtener usuario administrador por rut
app.get('/usuario/administrador/:rut', (req, res) => {

    let rut = req.params.rut;
    usuario.obtenerAdministradorPorRut(rut, (error, results) => {

        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: "Usuario no encontrado"
            });
        }
        return res.json({
            success: 1,
            data: results
        });
    });
});

// Crear usuario administrador
app.post('/usuario/administrador', (req, res) => {

    let body = req.body;
    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    usuario.crearAdministrador(body, (error, results) => {
        
        if(error){
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: 'Error en la base de datos'
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
            message: 'Usuario creado'
        });
    });
});

// Actualizar usuario administrador
app.put('/usuario/administrador', (req, res) => {

    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    usuario.actualizarAdmin(body, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 1,
                message: 'Usuario actualizado correctamente'
            }); 
        }   
    });
});

// Eliminar usuario administrador 
app.delete('/usuario/administrador/:rut', (req, res) => {

    const data = req.params.rut;
    usuario.eliminarUsuario(data, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 1,
            message: 'Usuario eliminado correctamente'
            })
        }
    });
});

// ===================================
// API REST USUARIO CONDUCTOR
// ===================================

// Obtener usuarios conductores
app.get('/usuario/conductor', (req, res) => {
    
    usuario.obtenerConductores((error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: 'No existen administradores en la base de datos'
            });
        }
        return res.json({
            success: 1, 
            data: results
        }); 
    });
});

// Obtener usuario conductor por rut
app.get('/usuario/conductor/:rut', (req, res) => {

    let rut = req.params.rut;
    usuario.obtenerConductorPorRut(rut, (error, results) => {

        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: "Usuario no encontrado"
            });
        }
        return res.json({
            success: 1,
            data: results
        });
    });
});

// Crear usuario conductor
app.post('/usuario/conductor', (req, res) => {

    let body = req.body;
    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    usuario.crearConductor(body, (error, results) => {
        
        if(error){
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: 'Error en la base de datos'
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
            message: 'Usuario creado'
        });
    });
});

// Actualizar usuario conductor
app.put('/usuario/conductor', (req, res) => {
    
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    usuario.actualizarConductor(body, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 1,
                message: 'Conductor actualizado correctamente'
            });
        }
    });
});

// Eliminar usuario conductor
app.delete('/usuario/conductor/:rut', (req, res) => {

    const data = req.params.rut;
    usuario.eliminarUsuario(data, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 1,
                message: 'Usuario eliminado correctamente'
            })
        }
    });
});

// ===================================
// API REST USUARIO PASAJERO
// ===================================

// Obtener usuarios pasajeros
app.get('/usuario/pasajero', (req, res) => {

    usuario.obtenerPasajeros((error, results) => {

        if (error) {
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: 'No existen pasajeros en la base de datos.'
            });
        }

        return res.json({
            success: 1,
            data: results
        });
    });
});

// Obtener usuario pasajero por rut
app.get('/usuario/pasajero/:rut', (req, res) => {

    let rut = req.params.rut;
    usuario.obtenerPasajeroPorRut(rut, (error, results) => {

        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: "Usuario no encontrado"
            });
        }
        return res.json({
            success: 1,
            data: results
        });
    });
});

// Crear usuario pasajero
app.post('/usuario/pasajero', (req, res) => {
    
    let body = req.body;
    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    usuario.crearPasajero(body, (error, results) => {

        if(error) {
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: 'Database pool server error'
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
            message: 'Usuario creado'
        });
    });
});

// Actualizar usuario pasajero
app.put('/usuario/pasajero', (req, res) => {

    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    usuario.actualizarPasajero(body, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 1,
                message: 'Usuario actualizado correctamente'
            });
        }
    });
});

// Eliminar usuario pasajero 
app.delete('/usuario/pasajero/:rut', (req, res) => {

    const data = req.params.rut;
    usuario.eliminarUsuario(data, (error, results) => {   
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 1,
                message: 'Usuario eliminado'
            })
        }
    });
});

/* // Eliminar usuario pasajero de su viaje
app.delete('/usuario/pasajero/viaje', (req, res) => {

    const data = req.body;
    viaje.eliminarTieneViaje(data, (error, results, next) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success: 1
            });
        }
    })
}); */

//Eliminar todos los pasajeros
app.delete('/usuario/pasajeros', (req, res) => {

    usuario.eliminarPasajeros((error, results) => {

        if(error){
            return error;
        }
        if(!results){
            return res.json({
                success: 1,
                message: 'Todos los pasajeros han sido eliminados'
            });
        }
    });
});


module.exports = app;

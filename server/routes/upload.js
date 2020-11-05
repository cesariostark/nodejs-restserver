const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const User = require('../models/usuario');
const Product = require('../models/producto');

const fs = require('fs');
const path = require('path');
// Default options
app.use(fileUpload());

app.put('/upload/:type/:id', function(req, res) {

    let type = req.params.type;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }

    //Valida tipo
    let valType = ['productos', 'usuarios'];

    if (valType.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son: ' + valType.join(', '),
                type: type
            }
        });
    }

    let file = req.files.file;
    let cutFile = file.name.split('.');
    let extension = cutFile[cutFile.length - 1]

    // Extensiones permitidas 

    let valExt = ['png', 'jpg', 'gif', 'jpeg'];

    if (valExt.indexOf(extension) < 0) {
        return res.status(400).json({

            ok: false,
            err: {
                message: 'Las extensiones permitidas son: ' + valExt.join(', '),
                ext: extension
            }
        });
    }

    // Cambiar nombre al archivo

    let fileName = `${id}-${new Date().getMilliseconds()}.${extension}`

    file.mv(`uploads/${ type }/${fileName}`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (type === 'usuarios') {
            userImage(id, res, fileName);
        } else if (type === 'productos') {
            productImage(id, res, fileName);
        }

    });
});

function userImage(id, res, fileName) {

    User.findById(id, (err, userDB) => {

        if (err) {
            deleteFile(fileName, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            deleteFile(fileName, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }

        deleteFile(userDB.img, 'usuarios');

        userDB.img = fileName;
        userDB.save((err, saveUser) => {

            res.json({
                ok: true,
                user: saveUser,
                img: fileName

            });
        });


    });
}

function productImage(id, res, fileName) {

    Product.findById(id, (err, productDB) => {

        if (err) {
            deleteFile(productDB.img, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            deleteFile(productDB.img, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        deleteFile(productDB.img, 'productos');

        productDB.img = fileName;
        productDB.save((err, saveProduct) => {

            res.json({
                ok: true,
                product: productDB,
                img: fileName
            });
        });
    });

}

function deleteFile(fileName, type) {

    let imagePath = path.resolve(__dirname, `../../uploads/${type}/${fileName}`);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
}

module.exports = app;
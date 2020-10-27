const express = require('express');
const { verifToken } = require('../middlewares/auth');

let app = express();
let Product = require('../models/producto');

// ======================
// Obtener productos
// ======================
app.get('/producto', (req, res) => {

    //trae todos los productos
    //populate: usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Product.find({ available: true })
        .skip(desde)
        .limit(5)
        .populate('user', 'nombre email')
        .populate('category', 'desc')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!products) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            });
        });
});

// ======================
// Obtener productos por ID
// ======================
app.get('/producto/:id', (req, res) => {

    //trae producto por ID
    //populate: usuario categoria
    let id = req.params.id;

    Product.findById(id)
        .populate('user', 'nombre email')
        .populate('category', 'desc')
        .exec((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productDB
            });
        });
});

// =======================
// Buscar un producto
// =======================
app.get('/producto/buscar/:search', verifToken, (req, res) => {

    let search = req.params.search;

    let regex = new RegExp(search, 'i');

    Product.find({ name: regex })
        .populate('categoria', 'nombre')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            });

        });
});
// =======================
// Crear un nuevo producto
// =======================
app.post('/producto', verifToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria

    let body = req.body;
    let product = new Product({

        name: body.name,
        unitPrice: body.unitPrice,
        desc: body.desc,
        category: body.category,
        user: req.usuario._id
    });

    product.save((err, productDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product: productDB
        });
    });
});

// =======================
// Actualizar un producto
// =======================
app.put('/producto/:id', verifToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let updateProduct = {
        unitPrice: body.unitPrice,
        desc: body.desc
    }

    Product.findByIdAndUpdate(id, updateProduct, { new: true, runValidators: true }, (err, productDB) => {

        if (err) {
            return res.status(400).json({

                ok: true,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }
        res.json({

            ok: true,
            producto: productDB
        });
    });
});

// =======================
// Borrar un producto
// =======================
app.delete('/producto/:id', verifToken, (req, res) => {

    // cambiar estado disponible
    let id = req.params.id;

    let changeAvailability = {
        available: false
    }

    Product.findByIdAndUpdate(id, changeAvailability, { new: true }, (err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productDB
        });
    });
});

module.exports = app;
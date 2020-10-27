const express = require('express');
let { verifToken, verifTokenRole } = require('../middlewares/auth');
let app = express();
let Category = require('../models/categoria');

// ============================
// Mostrar todas las categorias
// ============================
app.get('/categoria', (req, res) => {

    Category.find({})
        .sort('desc')
        .populate('user', 'nombre email')
        .exec((err, categories) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categories
            });
        });
});
// ============================
// Mostrar categoria por ID
// ============================
app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;

    Category.findById(id, (err, categories) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categories) {
            return res.status(404).json({
                ok: false,
                error: 'No se encuentra categoría'
            });
        }

        res.json({
            ok: true,
            categoria: categories
        });
    });
});
// ============================
// Crear una categoria
// ============================

app.post('/categoria', verifToken, (req, res) => {

    let body = req.body;

    let category = new Category({

        desc: body.desc,
        user: req.usuario._id
    });

    category.save((err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoryDB
        });
    });
});
// ============================
// Actualizar una categoria
// ============================

app.put('/categoria/:id', [verifToken, verifTokenRole], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategory = {
        desc: body.desc
    }

    Category.findByIdAndUpdate(id, descCategory, { new: true, runValidators: true }, (err, categories) => {

        if (err) {
            return res.status(400).json({
                ok: true,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categories
        })
    });
});
// ============================
// Eliminar una categoria
// ============================

app.delete('/categoria/:id', [verifToken, verifTokenRole], (req, res) => {

    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categories) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categories) {
            return res.status(400).json({
                ok: false,
                error: 'Categoria no encontrada'
            });
        }

        res.json({
            ok: true,
            categoria: `Categoria ${categories.desc} eliminada`
        });
    });
});

module.exports = app;
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

//default opt
app.use(fileUpload());

app.put('/upload', function(req, res){

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningún archivo'
            }
        })
    }
    let file = req.files.archivo;

    file.mv('uploads/excel.xlsx', (err) => {
        if(err)
        return res.status(500).json({
            ok: false,
            err
        });
        res.json({
            ok:true,
            message: 'Archivo subido correctamente'
        });
    });

});

module.exports = app;
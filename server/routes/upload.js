const express = require('express');
const fileUpload = require('express-fileupload');
const importExcel = require('convert-excel-to-json');

const app = express();


app.use(fileUpload());
app.post('/upload', function(req, res){

    if(!req.files) return res.status(400).json({
        ok: false,
        err: {
            msg: 'No se han subido archivos'
        }
    });

    let file = req.files.archivo;
    let fileName = file.name.split('.');
    let ext = fileName[fileName.length-1];
    
    //Extensiones permitidas
    let valExt = ['xls', 'xlsx', 'csv'];

    if(valExt.indexOf(ext) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + valExt.join(', ')
            }
        });
    }
    
    //cambiar nombre al archivo
    let newFileName = `archivo-${new Date().getTime()}-${new Date().getDate()}.${ext}`

    file.mv(`uploads/${newFileName}`, function(err){
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'No se pudo subir archivo'
            });
        } else{
            let result = importExcel({
                sourceFile: `uploads/${newFileName}`,
                header: {rows: 1},
                columnToKey: {
                    A: 'FECHA',
                    B: 'HORA',
                    C: 'SOLICITANTE',
                    D: 'NOMBRE',
                    E: 'RUT',
                    F: 'DIRECCION',
                    G: 'COMUNA',
                    H: 'CENTRO COSTO 1',
                    I: 'CENTRO COSTO 2',
                    J: 'CONDUCTOR',
                    K: 'DETALLE'
                }/* 
                sheets: ['Sheet1'] */
            });
            console.log(result);
            res.json({
                ok: true,
                msg: 'Archivo subido correctamente'
            });
        }
        
    });
});

module.exports = app;
const express = require('express');
// const fileUpload = require('express-fileupload');
const multer = require('multer');
const db = require('../services/db.sequelize');
const Usuario = db.usuario;
const bcrypt = require('bcrypt');

const readXlsxFile = require('read-excel-file/node');

const app = express();

const excelFilter = (req, file, cb) => {

    if(file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')){

        cb(null, true)
    } else {
        cb('Por favor ingrese un archivo excel', false);
    }
}
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `archivo-${Date.now()}-${file.originalname}`);
    }
});

const upload = async(req, res) => {

    let salt = bcrypt.genSaltSync(10);
    try{
        
        let path = __basedir + '/uploads/' + req.file.filename; 
        readXlsxFile(path).then((rows) => {

            //Skip HEADER
            rows.shift();

            let usuario = [];
            rows.forEach((row) => {
                let user = {
                    rut: `${row[0]}-${row[1]}`,
                    nombre: `${row[4]} ${row[3]} ${row[2]}`,
                    email: null,
                    contraseña: bcrypt.hashSync(String(row[0]).substr(0, 4), salt),
                    direccion: row[7],
                    comuna: row[8],
                    centro_costo_1: row[5],
                    centro_costo_2: row[6],
                    roles_id_Roles: row[9],
                }
                usuario.push(user);
            });
            Usuario.bulkCreate(usuario).then(() => {
                res.status(200).json({
                    message: 'Archivo subido a la base de datos: ' + req.file.originalname
                });
            })
            .catch((error) => {
                res.status(400).json({
                    message: 'Falla al importar registros en base de datos',
                    error: error.message
                });
            });
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: 'No se pudo subir el archivo: ' + req.file.originalname
        });
    }
}

const uploadFile = multer({storage: storage, fileFilter: excelFilter});

app.post('/upload', uploadFile.single('file'), upload);
module.exports = app;








/*
rut: `${row[0]}-${row[1]}`,
nombre: `${row[4]} ${row[3]} ${row[2]}`,
email: null,
contraseña: bcrypt.hashSync(String(row[0]).substr(0, 4), salt),
direccion: row[7],
comuna: row[8],
centro_costo_1: row[5],
centro_costo_2: row[6],
roles_id_Roles: row[9],

*/



/* 
rut: `${row[0]-row[1]}`,
nombre: `${row[4]} ${row[3]} ${row[2]}`,
email: row[5],
contraseña: bcrypt.hashSync(row[6], salt),
direccion: row[7],
comuna: row[8],
centro_costo_1: row[9],
centro_costo_2: row[10],
roles_id_Roles: row[11],
*/















/* 
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
            res.json({
                ok: true,
                msg: 'Archivo subido correctamente'
            });
        }
        upload(newFileName);
    });

}); */
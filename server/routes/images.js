const express = require('express');

const fs = require('fs');
const path = require('path');

const { verifyTokenImg } = require('../middlewares/auth');

const app = express();


app.get('/images/:type/:img', verifyTokenImg, (req, res) => {

    let type = req.params.type;
    let img = req.params.img;


    let imagePath = path.resolve(__dirname, `../../uploads/${type}/${img}`);

    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.png');
        res.sendFile(noImagePath);
    }
});





module.exports = app;
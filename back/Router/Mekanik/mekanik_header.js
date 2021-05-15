const express = require('express');
const multer = require('multer');
const router = express.Router();
const mekanik_header_Controller = require('../../Controller/Mekanik/mekanik_header');

var storageImage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, __dirname + '../../../Gambar/Mekanik/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '_' + file.originalname)
    }
})
var uploadImage = multer({storage : storageImage});

router.post("/register",uploadImage.single('gambar'),mekanik_header_Controller.register);
router.get('/show_all',mekanik_header_Controller.show_all)
router.put('/update/:id',uploadImage.single('gambar'),mekanik_header_Controller.update);
router.put('/change_status/:id',mekanik_header_Controller.change_status);
router.post('/search',mekanik_header_Controller.search);
router.post('/show_status/:status',mekanik_header_Controller.show_status);

module.exports = router;
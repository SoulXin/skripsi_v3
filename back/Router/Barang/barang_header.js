const express = require('express');
const multer = require('multer');
const router = express.Router();
const barang_header_Controller = require('../../Controller/Barang/barang_header');

var storageImage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, __dirname + '../../../Gambar/Barang/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '_' + file.originalname)
    }
})
var uploadImage = multer({storage : storageImage});

router.post("/register",uploadImage.single('gambar'),barang_header_Controller.register);
router.get('/show_all',barang_header_Controller.show_all);
router.get('/show_detail/:id',barang_header_Controller.show_detail);
router.post('/search',barang_header_Controller.search);
router.put('/update/:id',uploadImage.single('gambar'),barang_header_Controller.update);
router.put('/change_status/:id',barang_header_Controller.change_status);
router.get('/show_all_limit',barang_header_Controller.show_all_limit);
router.post('/search_limit',barang_header_Controller.search_limit);
router.post('/show_status/:status',barang_header_Controller.show_status);


// Keranjang pelanggan
router.get('/show_all_barang_keranjang/:id',barang_header_Controller.show_all_barang_keranjang);

module.exports = router;
const express = require('express');
const multer = require('multer');
const router = express.Router();
const pesanan_pelanggan_header_Controller = require('../../Controller/Pesanan_Pelanggan/pesanan_pelanggan_header');

var storageImage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, __dirname + '../../../Gambar/PesananPelanggan/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '_' + file.originalname)
    }
})
var uploadImage = multer({storage : storageImage});

router.post("/register",uploadImage.single('gambar'),pesanan_pelanggan_header_Controller.register);
router.get('/show_all',pesanan_pelanggan_header_Controller.show_all)
router.get('/show_detail/:id/:id_pesanan_pelanggan',pesanan_pelanggan_header_Controller.show_detail);
router.put('/update/:id',pesanan_pelanggan_header_Controller.update);
router.delete('/delete/:id',pesanan_pelanggan_header_Controller.delete);
router.get('/show_all_status/:status',pesanan_pelanggan_header_Controller.show_all_status)
router.get('/show_all_success',pesanan_pelanggan_header_Controller.show_all_success)
router.post('/search_date',pesanan_pelanggan_header_Controller.search_date);
router.get('/show_detail_pesanan/:id/:id_pesanan_pelanggan',pesanan_pelanggan_header_Controller.show_detail_pesanan);

module.exports = router;
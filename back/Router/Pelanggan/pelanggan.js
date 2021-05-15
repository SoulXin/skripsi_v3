const express = require('express');
const multer = require('multer');
const router = express.Router();
const pelanggan_Controller = require('../../Controller/Pelanggan/pelanggan');

var storageImage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, __dirname + '../../../Gambar/Pelanggan/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '_' + file.originalname)
    }
})
var uploadImage = multer({storage : storageImage});

router.post("/register",uploadImage.single('gambar'),pelanggan_Controller.register);
router.get('/show_all',pelanggan_Controller.show_all)
router.get('/show_detail/:id',pelanggan_Controller.show_detail);
router.post('/search',pelanggan_Controller.search);
router.put('/update/:id',uploadImage.single('gambar'),pelanggan_Controller.update);
router.delete('/delete/:id',pelanggan_Controller.delete);
router.get('/show_detail_user_id/:id',pelanggan_Controller.show_detail_user_id);

module.exports = router;
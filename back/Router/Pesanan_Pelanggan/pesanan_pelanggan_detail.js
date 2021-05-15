const express = require('express');
const router = express.Router();
const pesanan_pelanggan_detail_Controller = require('../../Controller/Pesanan_Pelanggan/pesanan_pelanggan_detail');

router.post("/register",pesanan_pelanggan_detail_Controller.register);
router.get('/show_detail/:id',pesanan_pelanggan_detail_Controller.show_detail);
router.put('/update/:id/:id_barang',pesanan_pelanggan_detail_Controller.update);
router.delete('/delete/:id/:id_barang',pesanan_pelanggan_detail_Controller.delete);

module.exports = router;
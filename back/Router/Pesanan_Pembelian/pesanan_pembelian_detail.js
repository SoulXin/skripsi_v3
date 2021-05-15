const express = require('express');
const router = express.Router();
const pesanan_pembelian_detail_Controller = require('../../Controller/Pesanan_Pembelian/pesanan_pembelian_detail');

router.post("/register",pesanan_pembelian_detail_Controller.register);
router.get('/show_detail/:id',pesanan_pembelian_detail_Controller.show_detail);
router.put('/update/:id/:id_barang',pesanan_pembelian_detail_Controller.update);
router.delete('/delete/:id/:id_barang',pesanan_pembelian_detail_Controller.delete);
router.delete('/delete_pesanan_pembelian/:id',pesanan_pembelian_detail_Controller.delete_pesanan_pembelian);
module.exports = router;
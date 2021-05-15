const express = require('express');
const router = express.Router();
const pesanan_pembelian_header_Controller = require('../../Controller/Pesanan_Pembelian/pesanan_pembelian_header');

router.post("/register",pesanan_pembelian_header_Controller.register);
router.get('/show_all',pesanan_pembelian_header_Controller.show_all)
router.get('/show_detail/:id',pesanan_pembelian_header_Controller.show_detail);
router.post('/search',pesanan_pembelian_header_Controller.search);
router.put('/update/:id',pesanan_pembelian_header_Controller.update);
router.delete('/delete/:id',pesanan_pembelian_header_Controller.delete);
router.get('/fix',pesanan_pembelian_header_Controller.fix);

module.exports = router;
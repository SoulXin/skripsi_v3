const express = require('express');
const router = express.Router();
const penjualan_header_Controller = require('../../Controller/Penjualan/penjualan_header');

router.post("/register",penjualan_header_Controller.register);
router.get('/show_all',penjualan_header_Controller.show_all)
router.get('/show_all_service',penjualan_header_Controller.show_all_service)
router.get('/show_detail/:id',penjualan_header_Controller.show_detail);
router.post('/search',penjualan_header_Controller.search);
router.put('/update/:id',penjualan_header_Controller.update);
router.delete('/delete/:id',penjualan_header_Controller.delete);
router.get('/show_pesanan_penjualan/:id',penjualan_header_Controller.show_pesanan_penjualan);
router.put('/proses_penjualan_header/:id',penjualan_header_Controller.proses_penjualan_header);
router.post('/searching_service',penjualan_header_Controller.searching_service);
router.post('/search_date',penjualan_header_Controller.search_date);
router.get('/fix',penjualan_header_Controller.fix);

module.exports = router;
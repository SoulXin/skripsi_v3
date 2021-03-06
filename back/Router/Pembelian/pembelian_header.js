const express = require('express');
const router = express.Router();
const pembelian_header_Controller = require('../../Controller/Pembelian/pembelian_header');

router.post("/register",pembelian_header_Controller.register);
router.get('/show_all',pembelian_header_Controller.show_all);
router.get('/show_all_laporan',pembelian_header_Controller.show_all_laporan);
router.get('/show_detail/:id',pembelian_header_Controller.show_detail);
router.post('/search',pembelian_header_Controller.search);
router.put('/update/:id',pembelian_header_Controller.update);
router.delete('/delete/:id',pembelian_header_Controller.delete);
router.post('/search_date',pembelian_header_Controller.search_date);
router.get('/fix',pembelian_header_Controller.fix);

// Laporan
router.post('/laporan_per_item',pembelian_header_Controller.laporan_per_item);

module.exports = router;
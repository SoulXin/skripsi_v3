const express = require('express');
const router = express.Router();
const retur_pembelian_header_Controller = require('../../Controller/Retur_Pembelian/retur_pembelian_header');

router.post("/register",retur_pembelian_header_Controller.register);
router.get('/show_all',retur_pembelian_header_Controller.show_all);
router.delete('/delete/:id',retur_pembelian_header_Controller.delete);
router.put('/update/:id',retur_pembelian_header_Controller.update);
router.get('/show_detail/:id',retur_pembelian_header_Controller.show_detail);
router.get('/show_retur',retur_pembelian_header_Controller.show_retur);
router.post('/search_date',retur_pembelian_header_Controller.search_date);
router.get('/fix',retur_pembelian_header_Controller.fix);

module.exports = router;
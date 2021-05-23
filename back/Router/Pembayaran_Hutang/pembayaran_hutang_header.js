const express = require('express');
const router = express.Router();
const pembayaran_hutang_header_Controller = require('../../Controller/Pembayaran_Hutang/pembayaran_hutang_header');

router.post("/register",pembayaran_hutang_header_Controller.register);
router.get('/show_all',pembayaran_hutang_header_Controller.show_all);
router.get('/show_detail/:id',pembayaran_hutang_header_Controller.show_detail);
router.get('/show_all_hutang',pembayaran_hutang_header_Controller.show_all_hutang);
router.get('/show_all_hutang_supplier/:id',pembayaran_hutang_header_Controller.show_all_hutang_supplier);
router.get('/show_all_hutang_lunas',pembayaran_hutang_header_Controller.show_all_hutang_lunas);
router.get('/show_all_pembayaran',pembayaran_hutang_header_Controller.show_all_pembayaran);
router.put('/update_lunas/:id',pembayaran_hutang_header_Controller.update_lunas);
router.delete("/delete/:id",pembayaran_hutang_header_Controller.delete);
router.post('/search',pembayaran_hutang_header_Controller.search);

module.exports = router;
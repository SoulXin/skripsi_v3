const express = require('express');
const router = express.Router();
const pembayaran_hutang_header_Controller = require('../../Controller/Hutang/pembayaran_hutang_header');

router.post("/register",pembayaran_hutang_header_Controller.register);
router.get('/show_all',pembayaran_hutang_header_Controller.show_all)
router.get('/show_detail/:id',pembayaran_hutang_header_Controller.show_detail);
router.post('/search',pembayaran_hutang_header_Controller.search);
router.put('/update/:id',pembayaran_hutang_header_Controller.update);
router.delete('/delete/:id',pembayaran_hutang_header_Controller.delete);

module.exports = router;
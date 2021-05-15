const express = require('express');
const router = express.Router();
const pembelian_detail_Controller = require('../../Controller/Pembelian/pembelian_detail');

router.post("/register",pembelian_detail_Controller.register);
router.get('/show_detail/:id',pembelian_detail_Controller.show_detail);
router.put('/update/:id/:id_barang',pembelian_detail_Controller.update);
router.delete('/delete/:id/:id_barang',pembelian_detail_Controller.delete);
router.delete('/delete_pembelian/:id',pembelian_detail_Controller.delete_pembelian);
router.get('/check_detail/:id',pembelian_detail_Controller.check_detail);

module.exports = router;
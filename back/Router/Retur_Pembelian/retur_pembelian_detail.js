const express = require('express');
const router = express.Router();
const retur_pembelian_detail_Controller = require('../../Controller/Retur_Pembelian/retur_pembelian_detail');

router.post("/register",retur_pembelian_detail_Controller.register);
router.get("/show_detail/:id",retur_pembelian_detail_Controller.show_detail);
router.delete('/delete_retur/:id',retur_pembelian_detail_Controller.delete_retur);
router.delete('/delete/:id/:id_barang',retur_pembelian_detail_Controller.delete);
router.put('/update/:id/:id_barang',retur_pembelian_detail_Controller.update);
router.get('/check_pembelian/:id/:id_pembelian',retur_pembelian_detail_Controller.check_pembelian);

module.exports = router;
const express = require('express');
const router = express.Router();
const penjualan_detail_Controller = require('../../Controller/Penjualan/penjualan_detail');

router.post("/register",penjualan_detail_Controller.register);
router.get("/show_detail/:id",penjualan_detail_Controller.show_detail);
router.put('/update/:id/:id_barang',penjualan_detail_Controller.update);
router.delete('/delete/:id',penjualan_detail_Controller.delete);
router.delete('/delete_detail/:id/:id_barang',penjualan_detail_Controller.delete_detail);

module.exports = router;
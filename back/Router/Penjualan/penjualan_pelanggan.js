const express = require('express');
const router = express.Router();
const penjualan_pelanggan_Controller = require('../../Controller/Penjualan/penjualan_pelanggan');

router.post("/register",penjualan_pelanggan_Controller.register);
router.put('/update/:id',penjualan_pelanggan_Controller.update);
router.delete('/delete/:id',penjualan_pelanggan_Controller.delete);
router.get("/show_detail/:id",penjualan_pelanggan_Controller.show_detail);
router.delete('/delete_detail/:id/:id_penjualan',penjualan_pelanggan_Controller.delete_detail);

module.exports = router;
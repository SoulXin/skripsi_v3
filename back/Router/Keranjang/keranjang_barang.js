const express = require('express');
const router = express.Router();
const keranjang_barang_Controller = require('../../Controller/Keranjang/keranjang_barang');

router.post("/register",keranjang_barang_Controller.register);
router.put('/update/:id',keranjang_barang_Controller.update);
router.delete('/delete/:id',keranjang_barang_Controller.delete);
router.post("/check",keranjang_barang_Controller.check);
router.get("/show_detail/:id",keranjang_barang_Controller.show_detail);
router.delete('/delete_item/:id',keranjang_barang_Controller.delete_item);

module.exports = router;
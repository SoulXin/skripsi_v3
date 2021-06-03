const express = require('express');
const router = express.Router();
const barang_kategori_Controller = require('../../Controller/Barang/barang_kategori');

router.post("/register",barang_kategori_Controller.register);
router.put('/update/:id',barang_kategori_Controller.update);
router.delete('/delete/:id',barang_kategori_Controller.delete);

module.exports = router;
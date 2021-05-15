const express = require('express');
const router = express.Router();
const pesanan_pelanggan_pengantaran_Controller = require('../../Controller/Pesanan_Pelanggan/pesanan_pelanggan_pengantaran');

router.post("/register",pesanan_pelanggan_pengantaran_Controller.register);
router.put('/update/:id',pesanan_pelanggan_pengantaran_Controller.update);
router.delete('/delete/:id',pesanan_pelanggan_pengantaran_Controller.delete);

module.exports = router;
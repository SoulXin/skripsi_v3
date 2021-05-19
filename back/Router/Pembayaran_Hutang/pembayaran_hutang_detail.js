const express = require('express');
const router = express.Router();
const pembayaran_hutang_detail_Controller = require('../../Controller/Pembayaran_Hutang/pembayaran_hutang_detail');

router.post("/register",pembayaran_hutang_detail_Controller.register);
router.put('/update/:id',pembayaran_hutang_detail_Controller.update);
router.delete("/delete/:id",pembayaran_hutang_detail_Controller.delete);

module.exports = router;
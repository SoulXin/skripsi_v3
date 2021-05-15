const express = require('express');
const router = express.Router();
const barang_detail_Controller = require('../../Controller/Barang/barang_detail');

router.post("/register",barang_detail_Controller.register);
router.put('/update/:id',barang_detail_Controller.update);
router.delete('/delete/:id',barang_detail_Controller.delete);

module.exports = router;
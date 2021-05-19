const express = require('express');
const router = express.Router();
const mekanik_detail_Controller = require('../../Controller/Mekanik/mekanik_detail');

router.post("/register",mekanik_detail_Controller.register);
router.get('/show_detail/:id',mekanik_detail_Controller.show_detail);
router.put('/update/:id',mekanik_detail_Controller.update);
router.delete('/delete/:id',mekanik_detail_Controller.delete);
router.put('/update_penjualan/:id',mekanik_detail_Controller.update_penjualan);
router.delete('/delete_penjualan/:id/:id_penjualan',mekanik_detail_Controller.delete_penjualan);

module.exports = router;
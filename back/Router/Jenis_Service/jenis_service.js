const express = require('express');
const router = express.Router();
const jenis_service_Controller = require('../../Controller/Jenis_Sevice/jenis_service');

router.post("/register",jenis_service_Controller.register);
router.get('/show_all',jenis_service_Controller.show_all)
router.post('/search',jenis_service_Controller.search);
router.put('/update/:id',jenis_service_Controller.update);
router.put('/change_status/:id',jenis_service_Controller.change_status);
router.post('/show_status/:status',jenis_service_Controller.show_status);

// Keranjang pelanggan
router.get('/show_all_service_keranjang/:id',jenis_service_Controller.show_all_service_keranjang);

module.exports = router;
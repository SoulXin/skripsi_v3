const express = require('express');
const router = express.Router();
const pesanan_pelanggan_booking_service_Controller = require('../../Controller/Pesanan_Pelanggan/pesanan_pelanggan_booking_service');

router.post("/register",pesanan_pelanggan_booking_service_Controller.register);
router.get('/show_all',pesanan_pelanggan_booking_service_Controller.show_all)
router.delete('/delete/:id/:id_service',pesanan_pelanggan_booking_service_Controller.delete);

module.exports = router;
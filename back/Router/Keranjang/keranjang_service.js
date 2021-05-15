const express = require('express');
const router = express.Router();
const keranjang_service_Controller = require('../../Controller/Keranjang/keranjang_service');

router.post("/register",keranjang_service_Controller.register);
router.delete('/delete/:id',keranjang_service_Controller.delete);
router.post('/check',keranjang_service_Controller.check);
router.get("/show_detail/:id",keranjang_service_Controller.show_detail);

module.exports = router;
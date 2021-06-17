const express = require('express');
const router = express.Router();
const penjualan_service_Controller = require('../../Controller/Penjualan/penjualan_service');

router.post("/register",penjualan_service_Controller.register);
router.get("/show_all",penjualan_service_Controller.show_all);
router.get("/show_detail/:id",penjualan_service_Controller.show_detail);
router.put('/update/:id',penjualan_service_Controller.update);
router.delete('/delete/:id',penjualan_service_Controller.delete);
router.delete('/delete_detail/:id/:id_service',penjualan_service_Controller.delete_detail);
router.put('/update_service/:id/:id_service',penjualan_service_Controller.update_service);

module.exports = router;
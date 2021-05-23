const express = require('express');
const router = express.Router();
const supplier_Controller = require('../../Controller/Supplier/supplier');

router.post("/register",supplier_Controller.register);
router.get('/show_all',supplier_Controller.show_all)
router.post('/search',supplier_Controller.search);
router.put('/update/:id',supplier_Controller.update);
router.put('/change_status/:id',supplier_Controller.change_status);
router.post('/show_status/:status',supplier_Controller.show_status);
router.get('/show_detail/:id',supplier_Controller.show_detail)

module.exports = router;
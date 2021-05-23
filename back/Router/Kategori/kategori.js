const express = require('express');
const router = express.Router();
const kategori_Controller = require('../../Controller/Kategori/kategori');

router.post("/register",kategori_Controller.register);
router.get("/show_all",kategori_Controller.show_all);
router.post('/search',kategori_Controller.search);
router.put('/update/:id',kategori_Controller.update);
router.put('/change_status/:id',kategori_Controller.change_status);
router.post('/show_status/:status',kategori_Controller.show_status);
router.get("/show_detail/:id",kategori_Controller.show_detail);


module.exports = router;
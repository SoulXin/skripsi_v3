const express = require('express');
const router = express.Router();
const mekanik_detail_Controller = require('../../Controller/Mekanik/mekanik_detail');

router.post("/register",mekanik_detail_Controller.register);
router.get('/show_detail/:id',mekanik_detail_Controller.show_detail);
router.put('/update/:id',mekanik_detail_Controller.update);
router.delete('/delete/:id',mekanik_detail_Controller.delete);

module.exports = router;
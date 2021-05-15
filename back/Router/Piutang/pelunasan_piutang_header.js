const express = require('express');
const router = express.Router();
const piutang_header_Controller = require('../../Controller/Piutang/piutang_header');

router.post("/register",piutang_header_Controller.register);
router.get('/show_all',piutang_header_Controller.show_all)
router.get('/show_detail/:id',piutang_header_Controller.show_detail);
router.post('/search',piutang_header_Controller.search);
router.put('/update/:id',piutang_header_Controller.update);
router.delete('/delete/:id',piutang_header_Controller.delete);

module.exports = router;
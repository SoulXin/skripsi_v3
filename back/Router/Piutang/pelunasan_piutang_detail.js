const express = require('express');
const router = express.Router();
const piutang_detail_Controller = require('../../Controller/Piutang/piutang_detail');

router.post("/register",piutang_detail_Controller.register);
router.put('/update/:id',piutang_detail_Controller.update);
router.delete('/delete/:id',piutang_detail_Controller.delete);

module.exports = router;
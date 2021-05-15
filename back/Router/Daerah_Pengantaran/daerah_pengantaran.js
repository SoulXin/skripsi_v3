const express = require('express');
const router = express.Router();
const form_daerah_pengantaran_Controller = require('../../Controller/Daerah_Pengantaran/daerah_pengantaran');

router.post("/register",form_daerah_pengantaran_Controller.register);
router.get('/show_all',form_daerah_pengantaran_Controller.show_all)
router.get('/show_detail/:id',form_daerah_pengantaran_Controller.show_detail);
router.post('/search',form_daerah_pengantaran_Controller.search);
router.put('/update/:id',form_daerah_pengantaran_Controller.update);
router.put('/change_status/:id',form_daerah_pengantaran_Controller.change_status);
router.post('/show_status/:status',form_daerah_pengantaran_Controller.show_status);

module.exports = router;
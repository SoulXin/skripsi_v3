const express = require('express');
const router = express.Router();
const hak_akses_Controller = require('../../Controller/Hak_Akses/hak_akses');

router.get("/show_all",hak_akses_Controller.show_all);

module.exports = router;
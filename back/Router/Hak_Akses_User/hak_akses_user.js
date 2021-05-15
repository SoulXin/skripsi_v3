const express = require('express');
const router = express.Router();
const hak_akses_user_Controller = require('../../Controller/Hak_Akses_User/hak_akses_user');

router.post("/register",hak_akses_user_Controller.register);
router.get("/show_detail/:id",hak_akses_user_Controller.show_detail);

module.exports = router;
const express = require('express');
const router = express.Router();
const user_Controller = require('../../Controller/User/user');

router.post("/register",user_Controller.register);
router.get("/show_all",user_Controller.show_all);
router.post('/login',user_Controller.login);
router.put('/change_password',user_Controller.change_password);
router.delete('/delete_user/:id',user_Controller.delete_user);

module.exports = router;
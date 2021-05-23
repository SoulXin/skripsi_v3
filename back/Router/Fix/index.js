const express = require('express');
const router = express.Router();
const fix_Controller = require('../../Controller/Fix/index');

router.get("/delete",fix_Controller.delete);

module.exports = router;
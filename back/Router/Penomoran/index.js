const express = require('express');
const router = express.Router();
const penomoran_Controller = require('../../Controller/Penomoran/index');

router.get('/show_detail/:id',penomoran_Controller.show_detail);
router.get('/show_all',penomoran_Controller.show_all);
router.put('/update/:id',penomoran_Controller.update);

module.exports = router;
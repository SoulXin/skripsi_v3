const express = require('express');
const router = express.Router();
const penyesuaian_header_Controller = require('../../Controller/Penyesuaian/penyesuaian_header');

router.post("/register",penyesuaian_header_Controller.register);
router.get('/show_all',penyesuaian_header_Controller.show_all);
router.delete('/delete/:id',penyesuaian_header_Controller.delete);
router.put('/update/:id',penyesuaian_header_Controller.update);
// router.get('/show_detail/:id',penyesuaian_header_Controller.show_detail);
// router.post('/search',penyesuaian_header_Controller.search);
router.post('/search_date',penyesuaian_header_Controller.search_date);

// Laporan
router.post('/laporan_per_item',penyesuaian_header_Controller.laporan_per_item);


module.exports = router;
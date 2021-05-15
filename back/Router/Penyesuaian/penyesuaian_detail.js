const express = require('express');
const router = express.Router();
const penyesuaian_detail_Controller = require('../../Controller/Penyesuaian/penyesuaian_detail');

router.post("/register",penyesuaian_detail_Controller.register);
router.get("/show_detail/:id",penyesuaian_detail_Controller.show_detail);
router.put('/update/:id/:id_barang',penyesuaian_detail_Controller.update);
router.delete('/delete/:id/:id_barang',penyesuaian_detail_Controller.delete);
router.delete('/delete_penyesuaian/:id',penyesuaian_detail_Controller.delete_penyesuaian);

module.exports = router;
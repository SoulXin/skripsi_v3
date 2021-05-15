const Pesanan_Pelanggan_Pengantaran = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_pengantaran');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_pesanan_pelanggan,id_daerah_pengantaran,kurir,resi,status_pengantaran_toko,status_pengantaran_pelanggan} = req.body;
    Pesanan_Pelanggan_Pengantaran.create({
        id_pesanan_pelanggan : id_pesanan_pelanggan,
        id_daerah_pengantaran : id_daerah_pengantaran,
        kurir : kurir,
        resi : resi,
        status_pengantaran_toko : status_pengantaran_toko,
        status_pengantaran_pelanggan : status_pengantaran_pelanggan
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.update = (req,res) => {
    const {id} = req.params;
    const {id_daerah_pengantaran,kurir,resi,status_pengantaran_toko,status_pengantaran_pelanggan} = req.body;
    Pesanan_Pelanggan_Pengantaran.update({
        id_daerah_pengantaran : id_daerah_pengantaran,
        kurir : kurir,
        resi : resi,
        status_pengantaran_toko : status_pengantaran_toko,
        status_pengantaran_pelanggan : status_pengantaran_pelanggan
    },{
        where : {
            id_pesanan_pelanggan : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete = (req,res) => {
    const {id} = req.params;
    Pesanan_Pelanggan_Pengantaran.destroy({
        where : {
            id_pesanan_pelanggan : id
        }
    })
    .then((result) => {
        res.status(200);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
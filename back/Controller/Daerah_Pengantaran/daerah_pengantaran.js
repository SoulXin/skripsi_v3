const Daerah_Pengantaran = require('../../Model/Daerah_Pengantaran/daerah_pengantaran');
const { Op } = require("sequelize");
const Pesanan_Pelanggan_Pengantaran = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_pengantaran');

exports.register = (req,res) => {
    const {kecamatan,harga} = req.body;
    Daerah_Pengantaran.create({
        kecamatan : kecamatan,
        harga : harga
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Daerah_Pengantaran.findAll({
        where : {
            aktif : 1
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Daerah_Pengantaran.findOne({
        include : [
            {
                model : Pesanan_Pelanggan_Pengantaran,
                as : 'Pesanan_Pelanggan_Pengantaran',
                where : {
                    id_daerah_pengantaran : id
                }
            },
           
        ]
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.search = (req,res) => {
    const {kecamatan} = req.body;
    Daerah_Pengantaran.findAll({
        where : {
            [Op.and] : [{
                kecamatan : {
                    [Op.substring] : kecamatan
                },
                aktif : 1
            }]
        }
    })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    })
}

exports.update = (req,res) => {
    const {id} = req.params;
    const {kecamatan,harga} = req.body;
    Daerah_Pengantaran.update({
        kecamatan : kecamatan,
        harga : harga,
    },{
        where : {
            id_daerah_pengantaran : id
        }
    })
    .then((result) => {
        res.status(200).json(result);

    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.change_status = (req,res) => {
    const {id} = req.params;
    const {aktif} = req.body;

    Daerah_Pengantaran.update({
        aktif : aktif
    },{where : {
            id_daerah_pengantaran : id
        }
    })
    .then((result) => {
        res.status(200).send();
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_status = (req,res) => {
    const {status} = req.params;
    Daerah_Pengantaran.findAll({
        where : {
            aktif : status
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
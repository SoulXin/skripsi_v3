const Pesanan_Pelanggan_Detail = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_detail');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_pesanan_pelanggan,id_barang,harga_jual,jumlah,total} = req.body;
    Pesanan_Pelanggan_Detail.create({
        id_pesanan_pelanggan : id_pesanan_pelanggan,
        id_barang : id_barang,
        harga_jual : harga_jual,
        jumlah : jumlah,
        total : total
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
    Pesanan_Pelanggan_Detail.findAll({
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

exports.update = (req,res) => {
    const {id,id_barang} = req.params;
    const {harga_jual,jumlah,total} = req.body;
    Pesanan_Pelanggan_Detail.update({
        harga_jual : harga_jual,
        jumlah : jumlah,
        total : total
    },{
        where : {
            [Op.and] : [
                {id_pesanan_pelanggan : id},
                {id_barang : id_barang}
            ]
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
    const {id,id_barang} = req.params;
    Pesanan_Pelanggan_Detail.destroy({
        where : {
            [Op.and] : [
                {id_pesanan_pelanggan : id},
                {id_barang : id_barang}
            ]
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
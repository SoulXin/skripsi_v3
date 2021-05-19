const Pesanan_Pembelian_Detail = require('../../Model/Pesanan_Pembelian/pesanan_pembelian_detail');
const Barang_Header = require('../../Model/Barang/barang_header');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_pesanan_pembelian,id_barang,harga_beli,jumlah,total} = req.body;
    Pesanan_Pembelian_Detail.create({
        id_pesanan_pembelian : id_pesanan_pembelian,
        id_barang : id_barang,
        harga_beli : harga_beli,
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
    Pesanan_Pembelian_Detail.findAll({
        where : {
            id_pesanan_pembelian : id
        },
        include : [
            {
                model : Barang_Header,
                as : 'Barang_Header'
            }
        ]
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
    const {harga_beli,jumlah,total} = req.body;
    Pesanan_Pembelian_Detail.update({
        harga_beli : harga_beli,
        jumlah : jumlah,
        total : total
    },{
        where : {
            [Op.and] : [
                {id_pesanan_pembelian : id},
                {id_barang : id_barang}
            ]
        }
    })
    .then((result) => {
        res.status(200).send(`Data pesanan pembelian berhasil di update`);

    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete = (req,res) => {
    const {id, id_barang} = req.params;
    Pesanan_Pembelian_Detail.destroy({
        where : {
            [Op.and] : [
                {id_pesanan_pembelian : id},
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

exports.delete_pesanan_pembelian = (req,res) => {
    const {id} = req.params;
    Pesanan_Pembelian_Detail.destroy({
        where : {
            id_pesanan_pembelian : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
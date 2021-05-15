const Penjualan_Detail = require('../../Model/Penjualan/penjualan_detail');
const { Op } = require("sequelize");
const Barang_Header = require('../../Model/Barang/barang_header');
const Barang_Detail = require('../../Model/Barang/barang_detail');

exports.register = (req,res) => {
    const {id_penjualan,id_barang,harga_jual,jumlah,total} = req.body;
    Penjualan_Detail.create({
        id_penjualan : id_penjualan,
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
    const { id } = req.params;
    Penjualan_Detail.findAll({
        where : {
            id_penjualan : id
        },
        include : [
            {
                model : Barang_Header,
                as : 'Barang_Header',
                include : [
                    {
                        model : Barang_Detail,
                        as : 'Barang_Detail',
                    }
                ]
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

exports.update = (req,res) => {
    const {id, id_barang} = req.params;
    const {harga_jual,jumlah,total} = req.body;
    Penjualan_Detail.update({
        harga_jual : harga_jual,
        jumlah : jumlah,
        total : total
    },{
        where : {
            [Op.and] : [
                {id_penjualan : id},
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
    const {id} = req.params;
    Penjualan_Detail.destroy({
        where : {
            id_penjualan : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete_detail = (req,res) => {
    const {id, id_barang} = req.params;
    Penjualan_Detail.destroy({
        where : {
            [Op.and] : [
                {id_penjualan : id},
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
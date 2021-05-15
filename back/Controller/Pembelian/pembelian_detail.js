const Pembelian_Detail = require('../../Model/Pembelian/pembelian_detail');
const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Barang_Header = require('../../Model/Barang/barang_header');
const { Op } = require("sequelize");
const Barang_Detail = require('../../Model/Barang/barang_detail');

exports.register = (req,res) => {
    const {id_pembelian,id_barang,harga_beli,jumlah,total} = req.body;
    Pembelian_Detail.create({
        id_pembelian : id_pembelian,
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
    Pembelian_Detail.findAll({
        where : {
            id_pembelian : id
        },
        include : [
            {
                model : Barang_Header,
                as : 'Barang_Header',
                include : [
                    {
                        model : Barang_Detail,
                        as : 'Barang_Detail'
                    }
                ]
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
    Pembelian_Detail.update({
        id_barang : id_barang,
        harga_beli : harga_beli,
        jumlah : jumlah,
        total : total
    },{
        where : {
            [Op.and] : [
                {id_pembelian : id},
                {id_barang : id_barang}
            ]
        }
    })
    .then((result) => {
        res.status(200).send(`Data pembelian berhasil di update`);

    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete = (req,res) => {
    const {id,id_barang} = req.params;
    Pembelian_Detail.destroy({
        where : {
            [Op.and] : [
                {id_pembelian : id},
                {id_barang : id_barang}
            ]
        }
    })
    .then((result) => {
        res.status(200).send(`Data pesanan pembelian detail berhasil di hapus`);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete_pembelian = (req,res) => {
    const {id} = req.params;
    Pembelian_Detail.destroy({
        where : {
            id_pembelian : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.check_detail = (req,res) => {
    const {id} = req.params;
    Pembelian_Detail.findOne({
        include : [
            {
                model : Barang_Header,
                as : 'Barang_Header',
                include : [
                    {
                        model : Barang_Detail,
                        as : 'Barang_Detail'
                    }
                ]
            },
            {
                model : Pembelian_Header,
                as : 'Pembelian_Header',
                where : {
                    id_pesanan_pembelian : id
                }
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
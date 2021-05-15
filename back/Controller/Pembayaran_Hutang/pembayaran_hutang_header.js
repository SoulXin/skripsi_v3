const Pembayaran_Hutang_Header = require('../../Model/Pembayaran_Hutang/pembayaran_hutang_header');
const { Op } = require("sequelize");
const Pembayaran_Hutang_Detail = require('../../Model/Pembayaran_Hutang/pembayaran_hutang_detail');
const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Supplier = require('../../Model/Supplier/supplier');

exports.register = (req,res) => {
    const {tanggal_pembayaran,id_supplier,total} = req.body;
    Pembayaran_Hutang_Header.create({
        tanggal_pembayaran : tanggal_pembayaran,
        id_supplier : id_supplier,
        total : total
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Pembayaran_Hutang_Header.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Pembayaran_Hutang_Header.findOne({
        include : [
            {
                model : Pembayaran_Hutang_Detail,
                as : 'Pembayaran_Hutang_Detail',
                where : {
                    id_pembelian : id
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

exports.show_all_hutang = (req,res) => {
    var date = new Date(0000-00-00);
    date.setDate(date.getDate());

    Pembelian_Header.findAll({
        where : {
            status : 'Proses'
            // [Op.and] : [
                // {tanggal_jatuh_tempo : {[Op.gte] : date}},
                // {status : 'Proses'}
            // ]
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pembayaran_Hutang_Detail,
                as : 'Pembayaran_Hutang_Detail',
                include : {
                    model : Pembayaran_Hutang_Header,
                    as : 'Pembayaran_Hutang_Header'
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

exports.show_all_hutang_lunas = (req,res) => {
    var date = new Date(0000-00-00);
    date.setDate(date.getDate());

    Pembelian_Header.findAll({
        where : {
            status : 'Selesai',
            metode_pembayaran : 0
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pembayaran_Hutang_Detail,
                as : 'Pembayaran_Hutang_Detail',
                include : {
                    model : Pembayaran_Hutang_Header,
                    as : 'Pembayaran_Hutang_Header'
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

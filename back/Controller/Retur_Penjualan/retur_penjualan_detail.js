const Retur_Penjualan_Detail = require('../../Model/Retur_Penjualan/retur_penjualan_detail');
const { Op } = require("sequelize");
const Barang_Header = require('../../Model/Barang/barang_header');

exports.register = (req,res) => {
    const {id_retur_penjualan,id_penjualan,id_barang,max,harga_jual,jumlah,total } = req.body;
    Retur_Penjualan_Detail.create({
        id_retur_penjualan : id_retur_penjualan ,
        id_penjualan : id_penjualan,
        id_barang : id_barang,
        harga_jual : harga_jual,
        max : max,
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
    Retur_Penjualan_Detail.findAll({
        where : {
            id_retur_penjualan : id
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

exports.delete_retur = (req,res) => {
    const {id} = req.params;
    Retur_Penjualan_Detail.destroy({
        where : {
            id_retur_penjualan : id
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

    Retur_Penjualan_Detail.update({
        harga_jual : harga_jual,
        jumlah : jumlah,
        total : total
    },{
        where : {
            [Op.and] : [
                {id_retur_penjualan : id},
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
    Retur_Penjualan_Detail.destroy({
        where : {
            [Op.and] : [
                {id_retur_penjualan : id},
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

exports.check_penjualan = (req,res) => {
    const {id,id_penjualan} = req.params;
    Retur_Penjualan_Detail.findOne({
        where : {
            [Op.and] : [
                {id_retur_penjualan : id},
                {id_penjualan : id_penjualan}
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

exports.delete_temp = (req,res) => {
    const {id} = req.params;
    Retur_Penjualan_Detail.destroy({
        where : {
            [Op.and] : [
                {id_retur_penjualan : id},
                {total : 0}
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
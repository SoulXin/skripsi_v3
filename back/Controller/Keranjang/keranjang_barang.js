const Keranjang_Barang = require('../../Model/Keranjang/keranjang_barang');
const { Op } = require("sequelize");
const Barang_Header = require('../../Model/Barang/barang_header');
const Barang_Detail = require('../../Model/Barang/barang_detail');

exports.register = (req,res) => {
    const {id_pelanggan,id_barang,jumlah} = req.body;
    Keranjang_Barang.create({
        id_pelanggan : id_pelanggan,
        id_barang : id_barang,
        jumlah : jumlah
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
    const {id_pelanggan,id_barang,jumlah} = req.body;
    Keranjang_Barang.update({
        id_pelanggan : id_pelanggan,
        id_barang : id_barang,
        jumlah : jumlah
    },{
        where : {
            id : id
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
    Keranjang_Barang.destroy({
        where : {
            id_pelanggan : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.check = (req,res) => {
    const {id_pelanggan,id_barang} = req.body;
    Keranjang_Barang.findOne({
        where : {
            [Op.and] : [
                {id_pelanggan : id_pelanggan},
                {id_barang : id_barang}
            ]
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

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Keranjang_Barang.findAll({
        where : {
            id_pelanggan : id
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
    })
    .catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    })
}

exports.delete_item = (req,res) => {
    const {id} = req.params;
    Keranjang_Barang.destroy({
        where : {
            id : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
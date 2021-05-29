const Penjualan_Pelanggan = require('../../Model/Penjualan/penjualan_pelanggan');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_penjualan,nama_pelanggan,nomor_polisi,no_antrian} = req.body;
    Penjualan_Pelanggan.create({
        id_penjualan : id_penjualan,
        nama_pelanggan : nama_pelanggan,
        nomor_polisi : nomor_polisi,
        no_antrian : no_antrian
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err)
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_detail = (req,res) => {
    const { id } = req.params;
    Penjualan_Pelanggan.findOne({
        where : {
            id_penjualan : id
        },
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
    const {id_penjualan,nama_pelanggan,nomor_polisi,no_antrian} = req.body;
    Penjualan_Pelanggan.update({
        id_penjualan : id_penjualan,
        nama_pelanggan : nama_pelanggan,
        nomor_polisi : nomor_polisi,
        no_antrian : no_antrian
    },{
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

exports.delete = (req,res) => {
    const {id} = req.params;
    Penjualan_Pelanggan.destroy({
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

exports.delete_detail = (req,res) => {
    const {id,id_penjualan} = req.params;
    Penjualan_Pelanggan.destroy({
        where : {
            id_penjualan : id_penjualan
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
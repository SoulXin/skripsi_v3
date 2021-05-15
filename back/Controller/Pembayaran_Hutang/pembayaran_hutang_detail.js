const Pembayaran_Hutang_Detail = require('../../Model/Pembayaran_Hutang/pembayaran_hutang_detail');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_pembayaran,id_pembelian,tanggal_pembelian,tanggal_jatuh_tempo,jumlah} = req.body;
    Pembayaran_Hutang_Detail.create({
        id_pembayaran : id_pembayaran,
        id_pembelian : id_pembelian,
        tanggal_pembelian : tanggal_pembelian,
        tanggal_jatuh_tempo : tanggal_jatuh_tempo,
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
    const {id,id_pembelian} = req.params;
    Pembayaran_Hutang_Detail.update({
        tanggal_pembelian : tanggal_pembelian,
        tanggal_jatuh_tempo : tanggal_jatuh_tempo,
        jumlah : jumlah
    },{
        where : {
            [Op.and] : [
                {id_pembayaran : id},
                {id_pembelian : id_pembelian}
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
const Pesanan_Pelanggan_Booking_Service = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_booking_service');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_pesanan_pelanggan,id_service,waktu,no_antrian} = req.body;
    Pesanan_Pelanggan_Booking_Service.create({
        id_pesanan_pelanggan : id_pesanan_pelanggan,
        id_service : id_service,
        waktu : waktu,
        no_antrian : no_antrian,
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Pesanan_Pelanggan_Booking_Service.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete = (req,res) => {
    const {id,id_service} = req.params;
    Pesanan_Pelanggan_Booking_Service.destroy({
        where : {
            [Op.and] : [
                {id_pesanan_pelanggan : id},
                {id_service : id_service}
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
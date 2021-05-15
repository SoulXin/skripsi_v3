const Keranjang_Service = require('../../Model/Keranjang/keranjang_service');
const Jenis_Service = require('../../Model/Jenis_Sevice/jenis_service');

const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_pelanggan,id_service} = req.body;
    Keranjang_Service.create({
        id_pelanggan : id_pelanggan,
        id_service : id_service
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
    Keranjang_Service.destroy({
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

exports.check = (req,res) => {
    const {id_pelanggan,id_service} = req.body;
    Keranjang_Service.findOne({
        where : {
            [Op.and] : [
                {id_pelanggan : id_pelanggan},
                {id_service : id_service}
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
    Keranjang_Service.findAll({
        where : {
            id_pelanggan : id
        },
        include : [
            {
                model : Jenis_Service,
                as : 'Jenis_Service'
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
const Jenis_Service = require('../../Model/Jenis_Sevice/jenis_service');
const Penjualan_Service = require('../../Model/Penjualan/penjualan_service');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_penjualan,id_service,waktu,no_antrian} = req.body;
    Penjualan_Service.create({
        id_penjualan : id_penjualan,
        id_service : id_service,
        waktu : waktu,
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

exports.show_all = (req,res) => {
    Penjualan_Service.findAll({
        include : [
            {
                model : Jenis_Service,
                as : 'Jenis_Service',
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

exports.show_detail = (req,res) => {
    const { id } = req.params;
    Penjualan_Service.findAll({
        where : {
            id_penjualan : id
        },
        include : [
            {
                model : Jenis_Service,
                as : 'Jenis_Service',
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
    const {id} = req.params;
    const {id_service,waktu,no_antrian} = req.body;
    Penjualan_Service.update({
        id_service : id_service,
        waktu : waktu,
        no_antrian : no_antrian
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
    Penjualan_Service.destroy({
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
    const {id,id_service} = req.params;
    Penjualan_Service.destroy({
        where : {
            [Op.and] : [
                {id_penjualan : id},
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
const Pesanan_Pembelian_Header = require('../../Model/Pesanan_Pembelian/pesanan_pembelian_header');
const Supplier = require('../../Model/Supplier/supplier');
const { Op } = require("sequelize");
const Pesanan_Pembelian_Detail = require('../../Model/Pesanan_Pembelian/pesanan_pembelian_detail');
const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');

exports.register = (req,res) => {
    const {tanggal_pemesanan,id_supplier,grand_total} = req.body;
    Pesanan_Pembelian_Header.create({
        tanggal_pemesanan : tanggal_pemesanan,
        id_supplier : id_supplier,
        grand_total : grand_total
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Pesanan_Pembelian_Header.findAll({
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pesanan_Pembelian_Detail,
                as : 'Pesanan_Pembelian_Detail'
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

exports.show_all_laporan = (req,res) => {
    Pesanan_Pembelian_Header.findAll({
        where : {
            status : 'Selesai'
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pesanan_Pembelian_Detail,
                as : 'Pesanan_Pembelian_Detail'
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
    const {id} = req.params;
    Pesanan_Pembelian_Header.findOne({
        where : {
            id_pesanan_pembelian : id
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pembelian_Header,
                as : 'Pembelian_Header'
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

exports.search = (req,res) => {
    const {tanggal_pemesanan} = req.body;
    Pesanan_Pembelian_Header.findAll({
        where : {
            tanggal_pemesanan : tanggal_pemesanan
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

exports.update = (req,res) => {
    const {id} = req.params;
    const {tanggal_pemesanan,id_supplier,grand_total,status} = req.body;
    Pesanan_Pembelian_Header.update({
        tanggal_pemesanan : tanggal_pemesanan,
        id_supplier : id_supplier,
        grand_total : grand_total,
        status : status
    },{
        where : {
            id_pesanan_pembelian : id
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
    Pesanan_Pembelian_Header.destroy({
        where : {
            id_pesanan_pembelian : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.fix = async (req,res) => {
    try{
        const response = await Pesanan_Pembelian_Header.findAll({where : {status : 'Pembuatan'}});
        for(var a = 0;a < response.length;a++){
            await Pesanan_Pembelian_Detail.destroy({
                where : {
                    id_pesanan_pembelian  : response[a].id_pesanan_pembelian 
                }
            });
            await Pesanan_Pembelian_Header.destroy({
                where : {
                    id_pesanan_pembelian  : response[a].id_pesanan_pembelian 
                } 
            })
        }
        res.status(200).send("Selesai");
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}
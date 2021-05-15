const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Pembelian_Detail = require('../../Model/Pembelian/pembelian_detail');
const Supplier = require('../../Model/Supplier/supplier');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {id_pesanan_pembelian,tanggal_pembelian,metode_pembayaran,tanggal_jatuh_tempo,id_supplier,grand_total} = req.body;
    Pembelian_Header.create({
        id_pesanan_pembelian : id_pesanan_pembelian,
        tanggal_pembelian : tanggal_pembelian,
        metode_pembayaran : metode_pembayaran,
        tanggal_jatuh_tempo : tanggal_jatuh_tempo,
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
    Pembelian_Header.findAll({
        include : [
            {
                model : Supplier,
                as : 'Supplier'
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
    console.log(req.params);
    const {id} = req.params;
    Pembelian_Header.findOne({
        where : {
            id_pembelian : id
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
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
    const {tanggal_pembelian} = req.body;
    Pembelian_Header.findAll({
        where : {
            tanggal_pembelian : tanggal_pembelian
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
    const {id_pesanan_pembelian,tanggal_pembelian,metode_pembayaran,tanggal_jatuh_tempo,id_supplier,grand_total,status} = req.body;
    Pembelian_Header.update({
        id_pesanan_pembelian : id_pesanan_pembelian,
        tanggal_pembelian : tanggal_pembelian,
        metode_pembayaran : metode_pembayaran,
        tanggal_jatuh_tempo : tanggal_jatuh_tempo,
        id_supplier : id_supplier,
        grand_total : grand_total,
        status : status
    },{
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

exports.delete = (req,res) => {
    const {id} = req.params;
    Pembelian_Header.destroy({
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

exports.search_date = (req,res) => {
    const {dari, sampai} = req.body;
    Pembelian_Header.findAll({
        where : {
            tanggal_pembelian : {
                [Op.between] : [dari,sampai]
            }
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
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

exports.fix = async (req,res) => {
    try{
        const response = await Pembelian_Header.findAll({where : {status : 'Pembuatan'}});
        const response2 = await Pembelian_Header.findAll({where : {status : 'Proses', tanggal_jatuh_tempo : '0000-00-00'}});
        for(var a = 0;a < response.length;a++){
            await Pembelian_Detail.destroy({
                where : {
                    id_pembelian  : response[a].id_pembelian 
                }
            });
            await Pembelian_Header.destroy({
                where : {
                    id_pembelian  : response[a].id_pembelian 
                } 
            })
        }
        for(var b = 0;b < response2.length;b++){
            await Pembelian_Detail.destroy({
                where : {
                    id_pembelian : response2[b].id_pembelian
                }
            })
            await Pembelian_Header.destroy({
                where : {
                    id_pembelian : response2[b].id_pembelian
                }
            })
        }
        res.status(200).send("Selesai");
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}
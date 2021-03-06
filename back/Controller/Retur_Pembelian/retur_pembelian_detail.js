const Retur_Pembelian_Detail = require('../../Model/Retur_Pembelian/retur_pembelian_detail');
const { Op } = require("sequelize");
const Barang_Header = require('../../Model/Barang/barang_header');

exports.register = (req,res) => {
    const {id_retur_pembelian,id_pembelian,id_barang,max,jumlah,total } = req.body;
    Retur_Pembelian_Detail.create({
        id_retur_pembelian : id_retur_pembelian ,
        id_pembelian : id_pembelian,
        id_barang : id_barang,
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
    Retur_Pembelian_Detail.findAll({
        where : {
            id_retur_pembelian : id
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
    Retur_Pembelian_Detail.destroy({
        where : {
            id_retur_pembelian : id
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
    const {jumlah,total} = req.body;

    Retur_Pembelian_Detail.update({
        jumlah : jumlah,
        total : total
    },{
        where : {
            [Op.and] : [
                {id_retur_pembelian : id},
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

exports.delete = async (req,res) => {
    const {id,id_barang} = req.params;
    try{
        if(id_barang != '0'){
            const result = await Retur_Pembelian_Detail.destroy({
                where : {
                    [Op.and] : [
                        {id_retur_pembelian : id},
                        {id_barang : id_barang}
                    ]
                }
            })
            res.status(200).json(result);
        }else{
            const result = await Retur_Pembelian_Detail.destroy({
                where : {
                    [Op.and] : [
                        {id_retur_pembelian : id},
                        {max : id_barang}
                    ]
                }
            })
            res.status(200).json(result);
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}

exports.check_pembelian = (req,res) => {
    const {id,id_pembelian} = req.params;
    Retur_Pembelian_Detail.findOne({
        where : {
            [Op.and] : [
                {id_retur_pembelian : id},
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
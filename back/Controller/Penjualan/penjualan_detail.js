const Penjualan_Detail = require('../../Model/Penjualan/penjualan_detail');
const { Op } = require("sequelize");
const Barang_Header = require('../../Model/Barang/barang_header');
const Barang_Kategori = require('../../Model/Barang/barang_kategori');

exports.register = async (req,res) => {
    const {id_penjualan,id_barang,jumlah,total} = req.body;
    try{
        await Penjualan_Detail.destroy({ 
            where : {
                [Op.and] : [
                    { id_penjualan : id_penjualan},
                    { id_barang : id_barang }
                ]
            }
        })
        await Penjualan_Detail.create({
            id_penjualan : id_penjualan,
            id_barang : id_barang,
            jumlah : jumlah,
            total : total
        })
        await res.status(200).send();
    }catch(err){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}

exports.show_detail = (req,res) => {
    const { id } = req.params;
    Penjualan_Detail.findAll({
        where : {
            id_penjualan : id
        },
        include : [
            {
                model : Barang_Header,
                as : 'Barang_Header',
                include : [
                    {
                        model : Barang_Kategori,
                        as : 'Barang_Kategori',
                    }
                ]
            },
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
    const {id, id_barang} = req.params;
    const {jumlah,total} = req.body;
    Penjualan_Detail.update({
        jumlah : jumlah,
        total : total
    },{
        where : {
            [Op.and] : [
                {id_penjualan : id},
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
    const {id} = req.params;
    Penjualan_Detail.destroy({
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
    const {id, id_barang} = req.params;
    Penjualan_Detail.destroy({
        where : {
            [Op.and] : [
                {id_penjualan : id},
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
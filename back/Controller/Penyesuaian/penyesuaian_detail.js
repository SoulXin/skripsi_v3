const Barang_Header = require('../../Model/Barang/barang_header');
const { Op } = require("sequelize");
const Barang_Kategori = require('../../Model/Barang/barang_kategori');
const Penyesuaian_Detail = require('../../Model/Penyesuaian/penyesuaian_detail');

exports.register = (req,res) => {
    const {id_penyesuaian,id_barang,jumlah_fisik,jumlah_sistem,penyesuaian} = req.body;
    Penyesuaian_Detail.create({
        id_penyesuaian : id_penyesuaian,
        id_barang : id_barang,
        jumlah_fisik : jumlah_fisik,
        jumlah_sistem : jumlah_sistem,
        penyesuaian : penyesuaian,
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
    Penyesuaian_Detail.findAll({
        where : {
            id_penyesuaian : id
        },
        include : [
            {
                model : Barang_Header,
                as : 'Barang_Header',
                include : [
                    {
                        model : Barang_Kategori,
                        as : 'Barang_Kategori'
                    }
                ]
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
    const {id,id_barang} = req.params;
    const {jumlah_fisik,penyesuaian} = req.body;
    Penyesuaian_Detail.update({
        jumlah_fisik : jumlah_fisik,
        penyesuaian : penyesuaian
    },{
        where : {
            [Op.and] : [
                {id_penyesuaian : id},
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
    const {id,id_barang} = req.params;
    Penyesuaian_Detail.destroy({
        where : {
            [Op.and] : [
                {id_penyesuaian : id},
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

exports.delete_penyesuaian = (req,res) => {
    const {id} = req.params;
    Penyesuaian_Detail.destroy({
        where : {
            id_penyesuaian : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
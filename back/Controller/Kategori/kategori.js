const Kategori = require('../../Model/Kategori/kategori');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {nama_kategori} = req.body;
    Kategori.create({
        nama_kategori : nama_kategori,
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Kategori.findAll({
        where : {
            aktif : 1
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.search = (req,res) => {
    const {nama_kategori} = req.body;
    Kategori.findAll({
        where : {
            [Op.and] : [{
                nama_kategori : {
                    [Op.substring] : nama_kategori
                },
                aktif : 1
            }]
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
    const {nama_kategori} = req.body;
    Kategori.update({
        nama_kategori : nama_kategori,
    },{
        where : {
            id_kategori : id
        }
    })
    .then((result) => {
        res.status(200).json(result);

    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.change_status = (req,res) => {
    const {id} = req.params;
    const {aktif} = req.body;

    Kategori.update({
        aktif : aktif
    },{where : {
            id_kategori : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_status = (req,res) => {
    const {status} = req.params;
    Kategori.findAll({
        where : {
            aktif : status
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
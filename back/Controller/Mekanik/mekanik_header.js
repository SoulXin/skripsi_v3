const Mekanik_Header = require('../../Model/Mekanik/mekanik_header');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {nama,no_telp,alamat} = req.body;
    Mekanik_Header.create({
        nama : nama,
        no_telp : no_telp,
        alamat : alamat,
        gambar : req.file.filename
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Mekanik_Header.findAll({
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

exports.update = (req,res) => {
    const {id} = req.params;
    const {nama,no_telp,alamat} = req.body;
    if(req.file){ // => Jika ada gambar
        Mekanik_Header.update({
            nama : nama,
            no_telp : no_telp,
            alamat : alamat,
            gambar : req.file.filename
        },{
            where : {
                id_mekanik : id
            }
        })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
            res.status(400).end();
        });
    }else{ // => Jika tidak ada gambar
        Mekanik_Header.update({
            nama : nama,
            no_telp : no_telp,
            alamat : alamat,
        },{
            where : {
                id_mekanik : id
            }
        })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
            res.status(400).end();
        });
    }
}

exports.change_status = (req,res) => {
    const {id} = req.params;
    const {aktif} = req.body;

    Mekanik_Header.update({
        aktif : aktif
    },{
        where : {
            id_mekanik : id
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
    const {nama_mekanik} = req.body;
    Mekanik_Header.findAll({
        where : {
            [Op.and] : [{
                nama : {
                    [Op.substring] : nama_mekanik
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

exports.show_status = (req,res) => {
    const {status} = req.params;
    Mekanik_Header.findAll({
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
const Penomoran = require('../../Model/Penomoran/index');

exports.show_all = (req,res) => {
    Penomoran.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Penomoran.findOne({
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

exports.update = (req,res) => {
    const {id} = req.params;
    const {nomor_terakhir,format} = req.body;
    Penomoran.update({
        nomor_terakhir : nomor_terakhir,
        format : format,
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
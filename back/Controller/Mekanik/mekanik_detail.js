const Mekanik_Detail = require('../../Model/Mekanik/mekanik_detail');

exports.register = (req,res) => {
    const {id_mekanik,id_penjualan,id_service,tanggal} = req.body;
    Mekanik_Detail.create({
        id_mekanik : id_mekanik,
        id_penjualan : id_penjualan,
        id_service : id_service,
        tanggal : tanggal
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
    Mekanik_Detail.findOne({
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

exports.update = (req,res) => {
    const {id} = req.params;
    const {nama,no_telp,alamat,gambar} = req.body;
    Mekanik_Header.update({
        nama : nama,
        no_telp : no_telp,
        alamat : alamat,
        gambar : gambar
    },{
        where : {
            id_mekanik : id
        }
    })
    .then((result) => {
        res.status(200);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete = (req,res) => {
    const {id} = req.params;
    Mekanik_Header.destroy({
        where : {
            id_mekanik : id
        }
    })
    .then((result) => {
        res.status(200);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
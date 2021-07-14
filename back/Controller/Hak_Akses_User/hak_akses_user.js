const Hak_Akses_User = require('../../Model/Hak_Akses_User/hak_akses_user');
const Hak_Akses = require('../../Model/Hak_Akses/hak_akses');

const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {user_id,hak_akses_id} = req.body;
    Hak_Akses_User.create({
        user_id : user_id,
        hak_akses_id : hak_akses_id
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
    Hak_Akses_User.findAll({
        where : {
            user_id : id
        },
        include : [
            {
                model : Hak_Akses,
                as : 'Hak_Akses'
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
    const {id,hak_akses_id} = req.params;
    const {lihat,ubah,hapus} = req.body;
    Hak_Akses_User.update({
        lihat : lihat,
        ubah : ubah,
        hapus : hapus
    },{
        where : {
            [Op.and] : [
                { user_id : id },
                { hak_akses_id : hak_akses_id }
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

exports.delete_user = (req,res) => {
    const {id} = req.params;
    Hak_Akses_User.destroy({
        where : {
            user_id : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
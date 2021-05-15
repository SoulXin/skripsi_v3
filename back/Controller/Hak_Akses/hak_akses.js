const Hak_Akses = require('../../Model/Hak_Akses/hak_akses');
const Hak_Akses_User = require('../../Model/Hak_Akses_User/hak_akses_user');

exports.show_all = async (req,res) => {
    Hak_Akses.findAll({
        include : [
            { model : Hak_Akses_User,as : 'Hak_Akses_User' }
        ]
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
const Peneysuaian_Header = require('../../Model/Penyesuaian/penyesuaian_header');
const { Op } = require("sequelize");
const Penyesuaian_Detail = require('../../Model/Penyesuaian/penyesuaian_detail');
const Penyesuaian_Header = require('../../Model/Penyesuaian/penyesuaian_header');

exports.register = (req,res) => {
    const {tanggal_penyesuaian} = req.body;
    Peneysuaian_Header.create({
        tanggal_penyesuaian : tanggal_penyesuaian
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
exports.show_all = (req,res) => {
    Peneysuaian_Header.findAll({
        include : [
            {
                model : Penyesuaian_Detail,
                as : 'Penyesuaian_Detail'
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

exports.delete = (req,res) => {
    const {id} = req.params;
    Peneysuaian_Header.destroy({
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

exports.update = (req,res) => {
    const {id} = req.params;
    const {tanggal_penyesuaian} = req.body;
    Peneysuaian_Header.update({
        tanggal_penyesuaian : tanggal_penyesuaian
    },{
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

exports.fix = async (req,res) => {
    try{
        const response = await Penyesuaian_Header.findAll({where : {tanggal_penyesuaian : '0000-00-00'}});
        for(var a = 0;a < response.length;a++){
            await Penyesuaian_Detail.destroy({
                where : {
                    id_penyesuaian  : response[a].id_penyesuaian 
                }
            });
            await Penyesuaian_Header.destroy({
                where : {
                    id_penyesuaian  : response[a].id_penyesuaian 
                } 
            })
        }
        res.status(200).send("Selesai");
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}
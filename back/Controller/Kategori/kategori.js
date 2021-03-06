const Kategori = require('../../Model/Kategori/kategori');
const { Op } = require("sequelize");

exports.register = async (req,res) => {
    const {id_kategori,nama_kategori} = req.body;
    try{
        const search = await Kategori.findOne({ where : {id_kategori : id_kategori}});
        if(!search){
            const result = await Kategori.create({
                id_kategori : id_kategori,
                nama_kategori : nama_kategori,
            })
            res.status(200).json(result);
        }else{
            res.status(200).send("Id Kategori Sudah Dipakai");
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
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

exports.show_total_data = (req,res) => {
    Kategori.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}


exports.show_detail = (req,res) => {
    const {id} = req.params;
    Kategori.findOne({
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

exports.search = async (req,res) => {
    const {nama_kategori,aktif} = req.body;
    try{
        if(aktif){
            const response = await Kategori.findAll({
                where : {
                    [Op.and] : [{
                        nama_kategori : {
                            [Op.substring] : nama_kategori
                        },
                        aktif : aktif
                    }]
                }
            })
            res.status(200).json(response);
        }else{
            const response = await Kategori.findAll({
                where : {
                    [Op.and] : [{
                        nama_kategori : {
                            [Op.substring] : nama_kategori
                        },
                        aktif : 1
                    }]
                }
            })
            res.status(200).json(response);
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
        res.status(400).end();
    }
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
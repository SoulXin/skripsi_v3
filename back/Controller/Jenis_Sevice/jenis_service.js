const Jenis_Service = require('../../Model/Jenis_Sevice/jenis_service');
const { Op } = require("sequelize");
const Keranjang_Service = require('../../Model/Keranjang/keranjang_service');

exports.register = (req,res) => {
    const {nama,harga} = req.body;
    Jenis_Service.create({
        nama : nama,
        harga : harga
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Jenis_Service.findAll({
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
    Jenis_Service.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}


exports.show_detail = (req,res) => {
    const {id} = req.params;
    Jenis_Service.findOne({
        where : {
            id_service : id
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
    const {nama,aktif} = req.body;
    try{
        if(aktif){
            const response = await Jenis_Service.findAll({
                where : {
                    [Op.and] : [{
                        nama : {
                            [Op.substring] : nama
                        },
                        aktif : aktif
                    }]
                }
            })
            res.status(200).json(response);
        }else{
            const response = await Jenis_Service.findAll({
                where : {
                    nama : {
                        [Op.substring] : nama
                    } 
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
    const {nama,harga} = req.body;
    Jenis_Service.update({
        nama : nama,
        harga : harga
    },{
        where : {
            id_service : id
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

    Jenis_Service.update({
        aktif : aktif
    },{where : {
            id_service : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all_service_keranjang = (req,res) => {
    const {id} = req.params;
    Jenis_Service.findAll({
        include : [
            {
                model : Keranjang_Service,
                as : 'Keranjang_Service',
                where : {
                    id_pelanggan : id
                }
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

exports.show_status = (req,res) => {
    const {status} = req.params;
    Jenis_Service.findAll({
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
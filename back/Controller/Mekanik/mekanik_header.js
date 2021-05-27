const Mekanik_Header = require('../../Model/Mekanik/mekanik_header');
const { Op } = require("sequelize");

exports.register = async (req,res) => {
    const {id_mekanik,nama,no_telp,alamat} = req.body;
    try{
        if(req.file){
            const search = await Mekanik_Header.findOne({ where : {id_mekanik : id_mekanik}});
            if(!search){
                const result = await Mekanik_Header.create({
                    id_mekanik : id_mekanik,
                    nama : nama,
                    no_telp : no_telp,
                    alamat : alamat,
                    gambar : req.file.filename
                })
                res.status(200).json(result);
            }else{
                res.status(200).send("Id Mekanik Sudah Dipakai");
            }
        }else{
            const search = await Mekanik_Header.findOne({ where : {id_mekanik : id_mekanik}});
            if(!search){
                const result = await Mekanik_Header.create({
                    id_mekanik : id_mekanik,
                    nama : nama,
                    no_telp : no_telp,
                    alamat : alamat
                })
                res.status(200).json(result);
            }else{
                res.status(200).send("Id Mekanik Sudah Dipakai");
            }
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
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

exports.show_total_data = (req,res) => {
    Mekanik_Header.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}


exports.show_detail = (req,res) => {
    const {id} = req.params;
    Mekanik_Header.findOne({
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

exports.search = async (req,res) => {
    const {nama_mekanik,aktif} = req.body;
    try{
        if(aktif){
            const response = await Mekanik_Header.findAll({
                where : {
                    [Op.and] : [{
                        nama : {
                            [Op.substring] : nama_mekanik
                        },
                        aktif : aktif
                    }]
                }
            })
            res.status(200).json(response);
        }else{
            const response = await Mekanik_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            nama : {
                                [Op.substring] : nama_mekanik
                            },
                            aktif : 1
                        },
                        
                    ]
                }
            })
            res.status(200).json(response);
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
        res.status(400).end();
    }
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
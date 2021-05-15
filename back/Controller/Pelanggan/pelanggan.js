const Pelanggan = require('../../Model/Pelanggan/pelanggan');
const { Op } = require("sequelize");

exports.register = async (req,res) => {
    const {user_id,nama_pelanggan,nomor_telepon_pelanggan,tempat_lahir,tanggal_lahir,alamat_pelanggan,kecamatan,kelurahan,kode_pos, email_pelanggan} = req.body;

    try{
        if(req.file){
            await Pelanggan.create({
                user_id : user_id,
                nama_pelanggan : nama_pelanggan,
                foto : req.file.filename,
                tempat_lahir : tempat_lahir,
                tanggal_lahir : tanggal_lahir,
                nomor_telepon_pelanggan : nomor_telepon_pelanggan,
                alamat_pelanggan : alamat_pelanggan,
                kecamatan : kecamatan,
                kelurahan : kelurahan,
                kode_pos : kode_pos,
                email_pelanggan : email_pelanggan,
            })
        }else{
            await Pelanggan.create({
                user_id : user_id,
                nama_pelanggan : nama_pelanggan,
                tempat_lahir : tempat_lahir,
                tanggal_lahir : tanggal_lahir,
                nomor_telepon_pelanggan : nomor_telepon_pelanggan,
                alamat_pelanggan : alamat_pelanggan,
                kecamatan : kecamatan,
                kelurahan : kelurahan,
                kode_pos : kode_pos,
                email_pelanggan : email_pelanggan,
            })
        }
        res.status(200).send();
    }catch(err){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}

exports.show_all = (req,res) => {
    Pelanggan.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Pelanggan.findOne({
        where : {
            id_pelanggan : id
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
    const {nama_pelanggan} = req.body;
    Pelanggan.findAll({
        where : {
            [Op.or] : [{
                nama_pelanggan : {
                    [Op.substring] : nama_pelanggan
                }
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

exports.update = async (req,res) => {
    const {id} = req.params;
    const {user_id,nama_pelanggan,nomor_telepon_pelanggan,tempat_lahir,tanggal_lahir,alamat_pelanggan,kecamatan,kelurahan,kode_pos, email_pelanggan} = req.body;
   
    try{
        if(req.file){
            await Pelanggan.update({
                user_id : user_id,
                nama_pelanggan : nama_pelanggan,
                foto : req.file.filename,
                tempat_lahir : tempat_lahir,
                tanggal_lahir : tanggal_lahir,
                nomor_telepon_pelanggan : nomor_telepon_pelanggan,
                alamat_pelanggan : alamat_pelanggan,
                kecamatan : kecamatan,
                kelurahan : kelurahan,
                kode_pos : kode_pos,
                email_pelanggan : email_pelanggan,
            },{
                where : {
                    id_pelanggan : id
                }
            })
        }else{
            await Pelanggan.update({
                user_id : user_id,
                nama_pelanggan : nama_pelanggan,
                tempat_lahir : tempat_lahir,
                tanggal_lahir : tanggal_lahir,
                nomor_telepon_pelanggan : nomor_telepon_pelanggan,
                alamat_pelanggan : alamat_pelanggan,
                kecamatan : kecamatan,
                kelurahan : kelurahan,
                kode_pos : kode_pos,
                email_pelanggan : email_pelanggan,
            },{
                where : {
                    id_pelanggan : id
                }
            })
        }
        res.status(200).send();
    }catch(err){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}

exports.delete = (req,res) => {
    const {id} = req.params;
    Pelanggan.destroy({
        where : {
            id_pelanggan : id
        }
    })
    .then((result) => {
        res.status(200).send(`Data pelanggan berhasil di hapus`);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_detail_user_id = (req,res) => {
    const {id} = req.params;
    Pelanggan.findOne({
        where :{
            user_id : id
        }
    })
    .then((result) =>{
        res.status(200).json(result);
    })
    .catch((err) =>{
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    })
}
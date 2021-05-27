const Supplier = require('../../Model/Supplier/supplier');
const { Op } = require("sequelize");

exports.register = async (req,res) => {
    const {id_supplier,nama_supplier,nomor_telepon_supplier,email_supplier,alamat_supplier,bank_supplier,no_rek_supplier,keterangan} = req.body;
    try{
        const search = await Supplier.findOne({ where : {id_supplier : id_supplier}});
        if(!search){
            const result = await Supplier.create({
                id_supplier : id_supplier,
                nama_supplier : nama_supplier,
                nomor_telepon_supplier : nomor_telepon_supplier,
                email_supplier : email_supplier,
                alamat_supplier : alamat_supplier,
                bank_supplier : bank_supplier,
                no_rek_supplier : no_rek_supplier,
                keterangan : keterangan
            });
            res.status(200).json(result);
        }else{
            res.status(200).send("Id Supplier Sudah Dipakai");
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}

exports.show_all = (req,res) => {
    Supplier.findAll({
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
    Supplier.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.search = (req,res) => {
    const {nama_supplier,aktif} = req.body;
    Supplier.findAll({
        where : {
            [Op.and] : [{
                nama_supplier : {
                    [Op.substring] : nama_supplier
                },
                aktif : aktif
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

exports.update = (req,res) => {
    const {id} = req.params;
    const {id_supplier,nama_supplier,nomor_telepon_supplier,email_supplier,alamat_supplier,bank_supplier,no_rek_supplier,keterangan} = req.body;
    Supplier.update({
        id_supplier : id_supplier,
        nama_supplier : nama_supplier,
        nomor_telepon_supplier : nomor_telepon_supplier,
        email_supplier : email_supplier,
        alamat_supplier : alamat_supplier,
        bank_supplier : bank_supplier,
        no_rek_supplier : no_rek_supplier,
        keterangan : keterangan
    },{
        where : {
            id_supplier : id
        }
    })
    .then((result) => {
        res.status(200).send(`Data supplier berhasil di update`);

    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.change_status = (req,res) => {
    const {id} = req.params;
    const {aktif} = req.body;

    Supplier.update({
        aktif : aktif
    },{where : {
            id_supplier : id
        }
    })
    .then((result) => {
        res.status(200).send();
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_status = (req,res) => {
    const {status} = req.params;
    Supplier.findAll({
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

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Supplier.findOne({
        where : {
            id_supplier : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Retur_Pembelian_Detail = require('../../Model/Retur_Pembelian/retur_pembelian_detail');
const Retur_Pembelian_Header = require('../../Model/Retur_Pembelian/retur_pembelian_header');
const Supplier = require('../../Model/Supplier/supplier');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {tanggal_retur,id_supplier,alasan_retur,grand_total } = req.body;
    Retur_Pembelian_Header.create({
        tanggal_retur : tanggal_retur,
        id_supplier : id_supplier,
        alasan_retur : alasan_retur,
        grand_total : grand_total
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Retur_Pembelian_Header.findAll({
        include : [
            {
                model : Retur_Pembelian_Detail,
                as : 'Retur_Pembelian_Detail'
            },
            {
                model : Supplier,
                as : 'Supplier'
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
    const {id} = req.params;
    const {tanggal_retur,id_supplier,alasan_retur,grand_total} = req.body;
    Retur_Pembelian_Header.update({
        tanggal_retur : tanggal_retur,
        id_supplier : id_supplier,
        alasan_retur : alasan_retur,
        grand_total : grand_total
    },{
        where : {
            id_retur_pembelian : id
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
    Retur_Pembelian_Header.findOne({
        where :{
            id_retur_pembelian : id
        }
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
    Retur_Pembelian_Header.destroy({
        where : {
            id_retur_pembelian : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_retur = async (req,res) => {
    try{
        const tempNum = [];
        const retur = await Retur_Pembelian_Header.findAll({
            where : {
                [Op.not] : [{id_supplier : 0}]
            },include : [{model : Retur_Pembelian_Detail, as : 'Retur_Pembelian_Detail', attributes : ['id_pembelian']}]
        })
        for(var a = 0;a < retur.length;a++){
            if(tempNum.indexOf(retur[a].Retur_Pembelian_Detail.id_pembelian)){
                tempNum.push(retur[a].Retur_Pembelian_Detail.id_pembelian);
            }
        }
        const pembelian = await Pembelian_Header.findAll({include : [{model : Supplier, as : 'Supplier'}]});


        var newArray = [];
        for (var i = 0; i < pembelian.length; i++) {
            // we want to know if a[i] is found in b
            var match = false; // we haven't found it yet
            for (var j = 0; j < tempNum.length; j++) {
                if (pembelian[i].id_pembelian == tempNum[j]) {
                    // we have found a[i] in b, so we can stop searching
                    match = true;
                    break;
                }
                // if we never find a[i] in b, the for loop will simply end,
                // and match will remain false
            }
            // add a[i] to newArray only if we didn't find a match.
            if (!match) {
                newArray.push(pembelian[i]);
            }
        }

       res.status(200).json(newArray);
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
        res.status(400).end();
    }
}

exports.search_date = (req,res) => {
    const {dari, sampai} = req.body;
    Retur_Pembelian_Header.findAll({
        where : {
            tanggal_retur : {
                [Op.between] : [dari,sampai]
            }
        },
        include : [
            {
                model : Retur_Pembelian_Detail,
                as : 'Retur_Pembelian_Detail'
            },
            {
                model : Supplier,
                as : 'Supplier'
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

exports.fix = async (req,res) => {
    try{
        const response = await Retur_Pembelian_Header.findAll({where : {tanggal_Retur : '0000-00-00'}});
        for(var a = 0;a < response.length;a++){
            await Retur_Pembelian_Detail.destroy({
                where : {
                    id_retur_pembelian  : response[a].id_retur_pembelian 
                }
            });
            await Retur_Pembelian_Header.destroy({
                where : {
                    id_retur_pembelian  : response[a].id_retur_pembelian 
                } 
            })
        }
        res.status(200).send("Selesai");
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}
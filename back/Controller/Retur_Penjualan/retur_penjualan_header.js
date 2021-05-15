const Retur_Penjualan_Detail = require('../../Model/Retur_Penjualan/retur_penjualan_detail');
const Retur_Penjualan_Header = require('../../Model/Retur_Penjualan/retur_penjualan_header');
const Pelanggan = require('../../Model/Pelanggan/pelanggan');
const Penjualan_Detail = require('../../Model/Penjualan/penjualan_detail');
const Penjualan_Header = require('../../Model/Penjualan/penjualan_header');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {tanggal_retur,id_pelanggan,alasan_retur,grand_total } = req.body;
    Retur_Penjualan_Header.create({
        tanggal_retur : tanggal_retur,
        id_pelanggan : id_pelanggan,
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
    Retur_Penjualan_Header.findAll({
        include : [
            {
                model : Retur_Penjualan_Detail,
                as : 'Retur_Penjualan_Detail'
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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
    const {tanggal_retur,id_pelanggan,nopol,alasan_retur,grand_total} = req.body;
    Retur_Penjualan_Header.update({
        tanggal_retur : tanggal_retur,
        id_pelanggan : id_pelanggan,
        nopol : nopol,
        alasan_retur : alasan_retur,
        grand_total : grand_total
    },{
        where : {
            id_retur_penjualan : id
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
    Retur_Penjualan_Header.findOne({
        where :{
            id_retur_penjualan : id
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
    Retur_Penjualan_Header.destroy({
        where : {
            id_retur_penjualan : id
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
        const retur = await Retur_Penjualan_Header.findAll({
            include : [{model : Retur_Penjualan_Detail, as : 'Retur_Penjualan_Detail', attributes : ['id_penjualan']}]
        });

        for(var a = 0;a < retur.length;a++){
            if(tempNum.indexOf(retur[a].Retur_Penjualan_Detail.id_penjualan)){
                tempNum.push(retur[a].Retur_Penjualan_Detail.id_penjualan);
            }
        }
        const penjualan = await Penjualan_Header.findAll({
            where : {
                status : {
                    [Op.and] : [{
                        [Op.notLike] : 'Pembuatan'
                    },{
                        [Op.notLike] : 'Tolak'
                    }]
                }
            },
            include : [
                {
                    model : Pelanggan,
                    as : 'Pelanggan'
                },
                {
                    model : Penjualan_Detail,
                    as : 'Penjualan_Detail',
                }
            ]
        });


        var newArray = [];
        for (var i = 0; i < penjualan.length; i++) {
            // we want to know if a[i] is found in b
            var match = false; // we haven't found it yet
            for (var j = 0; j < tempNum.length; j++) {
                if (penjualan[i].id_penjualan == tempNum[j]) {
                    // we have found a[i] in b, so we can stop searching
                    match = true;
                    break;
                }
                // if we never find a[i] in b, the for loop will simply end,
                // and match will remain false
            }
            // add a[i] to newArray only if we didn't find a match.
            if (!match) {
                newArray.push(penjualan[i]);
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
    Retur_Penjualan_Header.findAll({
        where : {
            tanggal_retur : {
                [Op.between] : [dari,sampai]
            }
        },
        include : [
            {
                model : Retur_Penjualan_Detail,
                as : 'Retur_Penjualan_Detail'
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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
        const response = await Retur_Penjualan_Header.findAll({where : {tanggal_Retur : '0000-00-00'}});
        for(var a = 0;a < response.length;a++){
            await Retur_Penjualan_Detail.destroy({
                where : {
                    id_retur_penjualan  : response[a].id_retur_penjualan 
                }
            });
            await Retur_Penjualan_Header.destroy({
                where : {
                    id_retur_penjualan  : response[a].id_retur_penjualan 
                } 
            })
        }
        res.status(200).send("Selesai");
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}
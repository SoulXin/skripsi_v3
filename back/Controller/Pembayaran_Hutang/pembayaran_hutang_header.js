const Pembayaran_Hutang_Header = require('../../Model/Pembayaran_Hutang/pembayaran_hutang_header');
const { Op } = require("sequelize");
const Pembayaran_Hutang_Detail = require('../../Model/Pembayaran_Hutang/pembayaran_hutang_detail');
const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Supplier = require('../../Model/Supplier/supplier');
const Retur_Pembelian_Header = require('../../Model/Retur_Pembelian/retur_pembelian_header');
const Retur_Pembelian_Detail = require('../../Model/Retur_Pembelian/retur_pembelian_detail');

exports.register = (req,res) => {
    const {tanggal_pembayaran,id_supplier,total} = req.body;
    Pembayaran_Hutang_Header.create({
        tanggal_pembayaran : tanggal_pembayaran,
        id_supplier : id_supplier,
        total : total
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all = (req,res) => {
    Pembayaran_Hutang_Header.findAll({})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Pembayaran_Hutang_Detail.findAll({
        where : {
            id_pembayaran : id
        },
        include : [
            {
                model : Pembayaran_Hutang_Header,
                as : 'Pembayaran_Hutang_Header',
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier'
                    }
                ]
            },
            {
                model : Pembelian_Header,
                as : 'Pembelian_Header'
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

exports.show_all_hutang = (req,res) => {
    var date = new Date(0000-00-00);
    date.setDate(date.getDate());

    Pembelian_Header.findAll({
        where : {
            [Op.and] : [
                { status : 'Proses' },
                { pembayaran : 0 },
                { metode_pembayaran : 0 }
            ]
        },
        include : [
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

exports.show_all_hutang_supplier = async (req,res) => {
    const {id} = req.params;

    try{
        // const tempNum = [];
        const responsePembelian = await Pembelian_Header.findAll({
            where : {
                [Op.and] : [
                    { status : 'Proses' },
                    { pembayaran : 0 }
                ]
            },
            include : [
                {
                    model : Supplier,
                    as : 'Supplier',
                    where : {
                        id_supplier : id
                    },
                }
            ]
        });

        const responseRetur = await Retur_Pembelian_Header.findAll({
            include : [
                
                {
                    model : Retur_Pembelian_Detail,
                    as : 'Retur_Pembelian_Detail'
                },
                {
                    model : Supplier,
                    as : 'Supplier',
                    where : {
                        id_supplier : id
                    },
                }
            ]
        });

        const check_total_retur = () => {
            const arr = [];

            for(var a = 0; a < responseRetur.length; a++ ){
                var temp_total = 0;
                var id_pembelian = '';
                for(var b = 0; b < responseRetur[a].Retur_Pembelian_Detail.length; b++){
                    temp_total += responseRetur[a].Retur_Pembelian_Detail[b].total
                    id_pembelian = responseRetur[a].Retur_Pembelian_Detail[b].id_pembelian
                }
                arr.push({temp_total, id_pembelian});
            }
            return arr
        }

        responsePembelian.filter((list,index) => {
            if(list.id_pembelian == check_total_retur()[index].id_pembelian){
                list.grand_total = list.grand_total - check_total_retur()[index].temp_total
            }
        })

        

        // for(var a = 0; a < responseRetur.length; a++){
        //     if(tempNum.indexOf(responseRetur[a].Retur_Pembelian_Detail[0].id_pembelian)){
        //         tempNum.push(responseRetur[a].Retur_Pembelian_Detail[0].id_pembelian);
        //     }
        // }

        // var newArray = [];
        // for (var i = 0; i < responsePembelian.length; i++) {
        //     // we want to know if a[i] is found in b
        //     var match = false; // we haven't found it yet
        //     for (var j = 0; j < tempNum.length; j++) {
        //         if (responsePembelian[i].id_pembelian == tempNum[j]) {
        //             // we have found a[i] in b, so we can stop searching
        //             match = true;
        //             break;
        //         }
        //         // if we never find a[i] in b, the for loop will simply end,
        //         // and match will remain false
        //     }
        //     // add a[i] to newArray only if we didn't find a match.
        //     if (!match) {
        //         newArray.push(responsePembelian[i]);
        //     }
        // }

        res.status(200).json(responsePembelian);
    }catch(err){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}

exports.show_all_pembayaran = (req,res) => {
    Pembayaran_Hutang_Header.findAll({
        include : [
            {
                model : Pembayaran_Hutang_Detail,
                as : 'Pembayaran_Hutang_Detail'
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

exports.show_all_hutang_lunas = (req,res) => {
    Pembelian_Header.findAll({
        where : {
            [Op.and] : [
                { status : 'Selesai' },
                { pembayaran : 1},
                { metode_pembayaran : 0 }
            ]
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pembayaran_Hutang_Detail,
                as : 'Pembayaran_Hutang_Detail',
                include : [
                    {
                        model : Pembayaran_Hutang_Header,
                        as : 'Pembayaran_Hutang_Header'
                    }
                ]
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

exports.update_lunas = (req,res) => {
    const {id} = req.params;
    const {tanggal_pembayaran,jenis_pembayaran} = req.body;

    Pembayaran_Hutang_Header.update({
        tanggal_pembayaran : tanggal_pembayaran,
        jenis_pembayaran : jenis_pembayaran,
        status_pembayaran : 1
    },{
        where : {
            id_pembayaran : id
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
    Pembayaran_Hutang_Header.destroy({
        where : {
            id_pembayaran : id
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
    const {supplier,status} = req.body;
    try{
        if(status != '2'){
            const response = await Pembayaran_Hutang_Header.findAll({
                where : {
                    status_pembayaran : status
                },
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier',
                        where : {
                            nama_supplier : {
                                [Op.substring] : supplier
                            }
                        }
                    }
                ]
            })
            res.status(200).json(response);
        }else{
            const response = await Pembayaran_Hutang_Header.findAll({
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier',
                        where : {
                            nama_supplier : {
                                [Op.substring] : supplier
                            }
                        }
                    }
                ]
            })
            res.status(200).json(response);
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
        res.status(400).end();
    }
    

}
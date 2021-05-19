const Mekanik_Header = require('../../Model/Mekanik/mekanik_header');
const Penjualan_Header = require('../../Model/Penjualan/penjualan_header');
const Jenis_Service = require('../../Model/Jenis_Sevice/jenis_service');
const { Op } = require("sequelize");
const Penjualan_Service = require('../../Model/Penjualan/penjualan_service');
const Penjualan_Detail = require('../../Model/Penjualan/penjualan_detail');
const Penjualan_Pelanggan = require('../../Model/Penjualan/penjualan_pelanggan');
const Mekanik_Detail = require('../../Model/Mekanik/mekanik_detail');
const Retur_Penjualan_Detail = require('../../Model/Retur_Penjualan/retur_penjualan_detail');

exports.register = (req,res) => {
    const {tanggal_penjualan,grand_total} = req.body;
    Penjualan_Header.create({
        tanggal_penjualan : tanggal_penjualan,
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
    Penjualan_Header.findAll({
        include : [
            {
                model : Penjualan_Detail,
                as : 'Penjualan_Detail',
            },
            {
                model : Penjualan_Pelanggan,
                as : 'Penjualan_Pelanggan'
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

exports.show_all_laporan = (req,res) => {
    Penjualan_Header.findAll({
        where : {
            status : 'Selesai'
        },
        include : [
            {
                model : Penjualan_Detail,
                as : 'Penjualan_Detail',
            },
            {
                model : Penjualan_Pelanggan,
                as : 'Penjualan_Pelanggan'
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

exports.show_all_service = (req,res) => {
    Penjualan_Header.findAll({
        include : [
            {
                model : Penjualan_Detail,
                as : 'Penjualan_Detail',
            },
            {
                model : Penjualan_Service,
                as : 'Penjualan_Service',
                include : [
                    {
                        model : Jenis_Service,
                        as : 'Jenis_Service'
                    }
                ]
            },
            {
                model : Mekanik_Detail,
                as : 'Mekanik_Detail',
                include : [
                    {
                        model : Mekanik_Header,
                        as : 'Mekanik_Header'
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

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Penjualan_Header.findOne({
        where : {
            id_penjualan : id
        },
        include : [
            {
                model : Mekanik_Detail,
                as : 'Mekanik_Detail'
            },
            {
                model : Retur_Penjualan_Detail,
                as : 'Retur_Penjualan_Detail'
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

exports.search = (req,res) => {
    const {tanggal_penjualan} = req.body;
    Penjualan_Header.findAll({
        where : {
            tanggal_penjualan : tanggal_penjualan
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
    const {tanggal_penjualan,grand_total,status} = req.body;
    Penjualan_Header.update({
        tanggal_penjualan : tanggal_penjualan,
        grand_total : grand_total,
        status : status
    },{
        where : {
            id_penjualan : id
        }
    })
    .then((result) => {
        res.status(200).send(`Data penjualan berhasil di update`);

    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.delete = (req,res) => {
    const {id} = req.params;
    Penjualan_Header.destroy({
        where : {
            id_penjualan : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_pesanan_penjualan = (req,res) => {
    const {id} = req.params;
    Penjualan_Header.findOne({
        where : {
            id_pesanan_pelanggan : id
        },
        include : [
            {
                model : Mekanik_Header,
                as : 'Mekanik_Header',
            },
        ]
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.proses_penjualan_header = (req,res) => {
    const {id} = req.params;
    const {mekanik,nopol,tanggal_penjualan,grand_total} = req.body;

    Penjualan_Header.update({
        id_mekanik : mekanik,
        nopol : nopol,
        tanggal_penjualan : tanggal_penjualan,        
        grand_total : grand_total
    },{
        where : {
            id_penjualan : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.searching_service = (req,res) => {
    const {id_mekanik,tanggal_penjualan} = req.body;

    // variable untuk jarak akhir tanggal, sedangkan tanggal_penjualan adalah awal tanggal
    var date = new Date(tanggal_penjualan);
    date.setDate(date.getDate());

    Penjualan_Header.findAll({
        where : {
            [Op.and] : [
                {
                    tanggal_penjualan : {
                        [Op.gte] :tanggal_penjualan ,
                        [Op.lte] : date
                    }
                }
            ]
        },
        include : [
            {
                model : Penjualan_Detail,
                as : 'Penjualan_Detail',
            },
            {
                model : Penjualan_Service,
                as : 'Penjualan_Service',
                include : [
                    {
                        model : Jenis_Service,
                        as : 'Jenis_Service'
                    }
                ]
            },
            {
                model : Mekanik_Detail,
                as : 'Mekanik_Detail',
                include : [
                    {
                        model : Mekanik_Header,
                        as : 'Mekanik_Header'
                    }
                ],
                where : {
                    id_mekanik : id_mekanik
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

exports.search_date = (req,res) => {
    const {dari,sampai} = req.body;

    Penjualan_Header.findAll({
        where : {
            [Op.and] : [
                {
                    tanggal_penjualan : {
                        [Op.between] : [dari,sampai]
                    }
                },
                {
                    status : 'Selesai'
                }
            ]
        },
        include : [
            {
                model : Penjualan_Pelanggan,
                as : 'Penjualan_Pelanggan'
            },
            {
                model : Penjualan_Detail,
                as : 'Penjualan_Detail',
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
        const response = await Penjualan_Header.findAll({});
        for(var a = 0;a < response.length;a++){
            await Penjualan_Detail.destroy({
                where : {
                    id_penjualan : response[a].id_penjualan
                }
            });
            await Penjualan_Service.destroy({
                where : {
                    id_penjualan : response[a].id_penjualan
                }
            })
            await Penjualan_Header.destroy({
                where : {
                    [Op.and] : [
                        {id_penjualan : response[a].id_penjualan},
                        {tanggal_penjualan : '0000-00-00'}
                    ]
                } 
            })
        }
        res.status(200).send("Selesai");
    }catch(err){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}
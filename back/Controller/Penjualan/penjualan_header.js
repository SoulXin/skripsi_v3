const Mekanik_Detail = require('../../Model/Mekanik/mekanik_detail');
const Mekanik_Header = require('../../Model/Mekanik/mekanik_header');
const Penjualan_Header = require('../../Model/Penjualan/penjualan_header');
const Jenis_Service = require('../../Model/Jenis_Sevice/jenis_service');
const { Op } = require("sequelize");
const Penjualan_Service = require('../../Model/Penjualan/penjualan_service');
const Penjualan_Detail = require('../../Model/Penjualan/penjualan_detail');
const Pelanggan = require('../../Model/Pelanggan/pelanggan');
const Pesanan_Pelanggan_Header = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_header');

exports.register = (req,res) => {
    const {id_pesanan_pelanggan,tanggal_penjualan,nopol,id_pelanggan,grand_total,status} = req.body;
    Penjualan_Header.create({
        id_pesanan_pelanggan : id_pesanan_pelanggan,
        id_pelanggan : id_pelanggan,
        tanggal_penjualan : tanggal_penjualan,
        nopol : nopol,
        grand_total : grand_total,
        status : status
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
                model : Pesanan_Pelanggan_Header,
                as : 'Pesanan_Pelanggan_Header',
                include : [
                    {
                        model : Pelanggan,
                        as : 'Pelanggan'
                    }
                ]
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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

exports.show_all_service = (req,res) => {
    Penjualan_Header.findAll({
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
                model : Mekanik_Header,
                as : 'Mekanik_Header'
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
                model : Mekanik_Header,
                as : 'Mekanik_Header'
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
    const {tanggal_penjualan,id_pelanggan,id_mekanik,nopol,grand_total,status} = req.body;
    Penjualan_Header.update({
        tanggal_penjualan : tanggal_penjualan,
        id_pelanggan : id_pelanggan,
        id_mekanik : id_mekanik,
        nopol : nopol,
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
        grand_total : grand_total,
        status : 'Proses'
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
            status : {
                [Op.and] : [{
                    [Op.notLike] : 'Pembuatan'
                },{
                    [Op.notLike] : 'Tolak'
                }]
            },
            [Op.and] : [
                {
                    tanggal_penjualan : {
                        [Op.gte] :tanggal_penjualan ,
                        [Op.lte] : date
                    }
                },
                {
                    id_mekanik : id_mekanik
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
                model : Mekanik_Header,
                as : 'Mekanik_Header'
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
            tanggal_penjualan : {
                [Op.between] : [dari,sampai]
            },
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
        const response = await Penjualan_Header.findAll({where : {status : 'Pembuatan'}});
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
                    id_penjualan : response[a].id_penjualan
                } 
            })
        }
        res.status(200).send("Selesai");
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}
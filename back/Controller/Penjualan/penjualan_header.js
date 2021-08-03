const Mekanik_Header = require('../../Model/Mekanik/mekanik_header');
const Penjualan_Header = require('../../Model/Penjualan/penjualan_header');
const Jenis_Service = require('../../Model/Jenis_Sevice/jenis_service');
const { Op } = require("sequelize");
const Penjualan_Service = require('../../Model/Penjualan/penjualan_service');
const Penjualan_Detail = require('../../Model/Penjualan/penjualan_detail');
const Barang_Header = require('../../Model/Barang/barang_header');
const moment = require('moment');
const Retur_Penjualan_Detail = require('../../Model/Retur_Penjualan/retur_penjualan_detail');

exports.register = (req,res) => {
    const {nama_pelanggan,nomor_polisi,tanggal_penjualan,grand_total} = req.body;
    Penjualan_Header.create({
        nama_pelanggan : nama_pelanggan,
        nomor_polisi : nomor_polisi,
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
                model : Penjualan_Service,
                as : 'Penjualan_Service'
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
        include : [
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

exports.show_all_service = async (req,res) => {
    const {id_mekanik,tanggal_penjualan} = req.body;
    const temp_array = [];
    
    // variable untuk jarak akhir tanggal, sedangkan tanggal_penjualan adalah awal tanggal
    var date = new Date(tanggal_penjualan);
    date.setDate(date.getDate());

    try{
        console.log("masuk ini" + id_mekanik + tanggal_penjualan)
        if(id_mekanik && tanggal_penjualan ){
            const penjualan_header = await Penjualan_Header.findAll({
                where : {
                    tanggal_penjualan : {
                        [Op.gte] :tanggal_penjualan ,
                        [Op.lte] : date
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
                            },
                            {
                                model : Mekanik_Header,
                                as : 'Mekanik_Header',
                                where : {
                                    id_mekanik : id_mekanik
                                }
                            }
                        ]
                    },
                    
                ]
            });
            for(var a = 0;a < penjualan_header.length;a++){
                for(var b = 0; b < penjualan_header[a].Penjualan_Service.length ;b++){
                    temp_array.push({
                        id_penjualan : penjualan_header[a].id_penjualan,
                        id_service : penjualan_header[a].Penjualan_Service[b].id_service,
                        id_mekanik : penjualan_header[a].Penjualan_Service[b].Mekanik_Header.id_mekanik,
                        tanggal_penjualan : penjualan_header[a].tanggal_penjualan,
                        nama_mekanik : penjualan_header[a].Penjualan_Service[b].Mekanik_Header.nama_mekanik,
                        service : penjualan_header[a].Penjualan_Service[b].Jenis_Service.nama_service,
                        harga : penjualan_header[a].Penjualan_Service[b].total
                    })
                }
            }  
        }else if(id_mekanik){
            const penjualan_header = await Penjualan_Header.findAll({
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
                            },
                            {
                                model : Mekanik_Header,
                                as : 'Mekanik_Header',
                                where : {
                                    id_mekanik : id_mekanik
                                }
                            }
                        ]
                    },
                    
                ]
            });

            for(var a = 0;a < penjualan_header.length;a++){
                for(var b = 0; b < penjualan_header[a].Penjualan_Service.length ;b++){
                    temp_array.push({
                        id_penjualan : penjualan_header[a].id_penjualan,
                        id_service : penjualan_header[a].Penjualan_Service[b].id_service,
                        id_mekanik : penjualan_header[a].Penjualan_Service[b].Mekanik_Header.id_mekanik,
                        tanggal_penjualan : penjualan_header[a].tanggal_penjualan,
                        nama_mekanik : penjualan_header[a].Penjualan_Service[b].Mekanik_Header.nama_mekanik,
                        service : penjualan_header[a].Penjualan_Service[b].Jenis_Service.nama_service,
                        harga : penjualan_header[a].Penjualan_Service[b].total
                    })
                }
            }
        }else if(tanggal_penjualan){
            const penjualan_header = await Penjualan_Header.findAll({
                where : {
                    tanggal_penjualan : {
                        [Op.gte] :tanggal_penjualan ,
                        [Op.lte] : date
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
                            },
                            {
                                model : Mekanik_Header,
                                as : 'Mekanik_Header'
                            }
                        ]
                    },
                    
                ]
            });

            for(var a = 0;a < penjualan_header.length;a++){
                for(var b = 0; b < penjualan_header[a].Penjualan_Service.length ;b++){
                    temp_array.push({
                        id_penjualan : penjualan_header[a].id_penjualan,
                        id_service : penjualan_header[a].Penjualan_Service[b].id_service,
                        id_mekanik : penjualan_header[a].Penjualan_Service[b].Mekanik_Header.id_mekanik,
                        tanggal_penjualan : penjualan_header[a].tanggal_penjualan,
                        nama_mekanik : penjualan_header[a].Penjualan_Service[b].Mekanik_Header.nama_mekanik,
                        service : penjualan_header[a].Penjualan_Service[b].Jenis_Service.nama_service,
                        harga : penjualan_header[a].Penjualan_Service[b].total
                    })
                }
            } 
        }else{
            const penjualan_header = await Penjualan_Header.findAll({
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
                            },
                            {
                                model : Mekanik_Header,
                                as : 'Mekanik_Header'
                            }
                        ]
                    },
                    
                ]
            });

            for(var a = 0;a < penjualan_header.length;a++){
                for(var b = 0; b < penjualan_header[a].Penjualan_Service.length ;b++){
                    temp_array.push({
                        id_penjualan : penjualan_header[a].id_penjualan,
                        id_service : penjualan_header[a].Penjualan_Service[b].id_service,
                        id_mekanik : penjualan_header[a].Penjualan_Service[b].Mekanik_Header.id_mekanik,
                        tanggal_penjualan : penjualan_header[a].tanggal_penjualan,
                        nama_mekanik : penjualan_header[a].Penjualan_Service[b].Mekanik_Header.nama_mekanik,
                        service : penjualan_header[a].Penjualan_Service[b].Jenis_Service.nama_service,
                        harga : penjualan_header[a].Penjualan_Service[b].total
                    })
                }
            } 
        }
        res.status(200).json(temp_array);
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
        res.status(400).end();
    }
    
}

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Penjualan_Header.findOne({
        where : {
            id_penjualan : id
        },
        include : [
            {
                model : Penjualan_Service,
                as : 'Penjualan_Service',
                include : [
                    {
                        model : Mekanik_Header,
                        as : 'Mekanik_Header'
                    }
                ]
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
    const {nama_pelanggan,nomor_polisi,tanggal_penjualan,grand_total,status} = req.body;
    Penjualan_Header.update({
        nama_pelanggan : nama_pelanggan,
        nomor_polisi : nomor_polisi,
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
        }
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

exports.laporan_per_item = async (req,res) => {
    const {dari,sampai} = req.body;
    const temp_array = [];

    try{
        if(dari && sampai){
            const penjualan_header = await Penjualan_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_penjualan : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Penjualan_Detail,
                        as : 'Penjualan_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    }
                ]
            })
            for(var a = 0;a < penjualan_header.length;a++){
                for(var b = 0; b < penjualan_header[a].Penjualan_Detail.length ;b++){
                    temp_array.push({
                        id_penjualan : penjualan_header[a].id_penjualan,
                        id_barang : penjualan_header[a].Penjualan_Detail[b].id_barang,
                        tanggal_penjualan : penjualan_header[a].tanggal_penjualan,
                        nama_barang : penjualan_header[a].Penjualan_Detail[b].Barang_Header.nama_barang,
                        harga : penjualan_header[a].Penjualan_Detail[b].Barang_Header.harga_jual,
                        jumlah : penjualan_header[a].Penjualan_Detail[b].jumlah,
                        total : penjualan_header[a].Penjualan_Detail[b].total,
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else{
            const penjualan_header = await Penjualan_Header.findAll({
                include : [
                    {
                        model : Penjualan_Detail,
                        as : 'Penjualan_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    }
                ]
            })
            for(var a = 0;a < penjualan_header.length;a++){
                for(var b = 0; b < penjualan_header[a].Penjualan_Detail.length ;b++){
                    temp_array.push({
                        id_penjualan : penjualan_header[a].id_penjualan,
                        id_barang : penjualan_header[a].Penjualan_Detail[b].id_barang,
                        tanggal_penjualan : penjualan_header[a].tanggal_penjualan,
                        nama_barang : penjualan_header[a].Penjualan_Detail[b].Barang_Header.nama_barang,
                        harga : penjualan_header[a].Penjualan_Detail[b].Barang_Header.harga_jual,
                        jumlah : penjualan_header[a].Penjualan_Detail[b].jumlah,
                        total : penjualan_header[a].Penjualan_Detail[b].total,
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
        res.status(400).end();
    }
}

exports.get_data_by_date = (req,res) => {
    const {date} = req.params;
    const datee = moment(date).format('YYYY-MM-DD');

    Penjualan_Header.findAll({
        where : {
            tanggal_penjualan : datee
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
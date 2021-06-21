const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Pembelian_Detail = require('../../Model/Pembelian/pembelian_detail');
const Supplier = require('../../Model/Supplier/supplier');
const { Op } = require("sequelize");
const Pembayaran_Hutang_Detail = require('../../Model/Pembayaran_Hutang/pembayaran_hutang_detail');
const Retur_Pembelian_Detail = require('../../Model/Retur_Pembelian/retur_pembelian_detail');
const Barang_Header = require('../../Model/Barang/barang_header');

exports.register = (req,res) => {
    const {id_pesanan_pembelian,tanggal_pembelian,metode_pembayaran,tanggal_jatuh_tempo,id_supplier,grand_total} = req.body;
    Pembelian_Header.create({
        id_pesanan_pembelian : id_pesanan_pembelian,
        tanggal_pembelian : tanggal_pembelian,
        metode_pembayaran : metode_pembayaran,
        tanggal_jatuh_tempo : tanggal_jatuh_tempo,
        id_supplier : id_supplier,
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
    Pembelian_Header.findAll({
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

exports.show_all_laporan = (req,res) => {
    Pembelian_Header.findAll({
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

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Pembelian_Header.findOne({
        where : {
            id_pembelian : id
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pembayaran_Hutang_Detail,
                as : 'Pembayaran_Hutang_Detail'
            },
            {
                model : Retur_Pembelian_Detail,
                as : 'Retur_Pembelian_Detail'
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
    const {tanggal_pembelian} = req.body;
    Pembelian_Header.findAll({
        where : {
            tanggal_pembelian : tanggal_pembelian
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
    const {id_pesanan_pembelian,tanggal_pembelian,metode_pembayaran,tanggal_jatuh_tempo,id_supplier,grand_total,pembayaran,status} = req.body;
    Pembelian_Header.update({
        id_pesanan_pembelian : id_pesanan_pembelian,
        tanggal_pembelian : tanggal_pembelian,
        metode_pembayaran : metode_pembayaran,
        tanggal_jatuh_tempo : tanggal_jatuh_tempo,
        id_supplier : id_supplier,
        grand_total : grand_total,
        pembayaran : pembayaran,
        status : status
    },{
        where : {
            id_pembelian : id
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
    Pembelian_Header.destroy({
        where : {
            id_pembelian : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.search_date = async (req,res) => {
    const {dari, sampai,nama} = req.body;
    try{
        if(dari && sampai && nama){
            const response = await Pembelian_Header.findAll({
                where : {  
                    tanggal_pembelian : {
                        [Op.between] : [dari,sampai]
                    } 
                },
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier',
                        where : {
                            nama_supplier : {
                                [Op.substring] : nama
                            }
                        }
                    }
                ]
            })
            res.status(200).json(response);
        }else if(nama){
            const response = await Pembelian_Header.findAll({
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier',
                        where : {
                            nama_supplier : {
                                [Op.substring] : nama
                            }
                        }
                    }
                ]
            })
            res.status(200).json(response);
        }else if(dari && sampai){
            const response = await Pembelian_Header.findAll({
                where : {
                    tanggal_pembelian : {
                        [Op.between] : [dari,sampai]
                    } 
                },
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier'
                    }
                ]
            })
            res.status(200).json(response);
        }else{
            const response = await Pembelian_Header.findAll({
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier'
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

exports.fix = async (req,res) => {
    try{
        const response = await Pembelian_Header.findAll({where : {status : 'Pembuatan'}});
        const response2 = await Pembelian_Header.findAll({where : {status : 'Proses', tanggal_jatuh_tempo : '0000-00-00'}});
        for(var a = 0;a < response.length;a++){
            await Pembelian_Detail.destroy({
                where : {
                    id_pembelian  : response[a].id_pembelian 
                }
            });
            await Pembelian_Header.destroy({
                where : {
                    id_pembelian  : response[a].id_pembelian 
                } 
            })
        }
        for(var b = 0;b < response2.length;b++){
            await Pembelian_Detail.destroy({
                where : {
                    id_pembelian : response2[b].id_pembelian
                }
            })
            await Pembelian_Header.destroy({
                where : {
                    id_pembelian : response2[b].id_pembelian
                }
            })
        }
        res.status(200).send("Selesai");
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
}

exports.laporan_per_item = async (req,res) => {
    const {dari,sampai,nama} = req.body;
    const temp_array = [];

    try{
        if(dari && sampai && nama){
            const pembelian_header = await Pembelian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_pembelian : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Pembelian_Detail,
                        as : 'Pembelian_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    },
                    {
                        model : Supplier,
                        as : 'Supplier',
                        where : {
                            nama_supplier : {
                                [Op.substring] : nama
                            }
                        }
                    }
                ]
            })
            for(var a = 0;a < pembelian_header.length;a++){
                for(var b = 0; b < pembelian_header[a].Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_pembelian : pembelian_header[a].id_pembelian,
                        id_pesanan_pembelian : pembelian_header[a].id_pesanan_pembelian ? pembelian_header[a].id_pesanan_pembelian : '-' ,
                        id_barang : pembelian_header[a].Pembelian_Detail[b].id_barang,
                        tanggal_pembelian : pembelian_header[a].tanggal_pembelian,
                        nama_barang : pembelian_header[a].Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : pembelian_header[a].Pembelian_Detail[b].Barang_Header.harga_beli,
                        jumlah : pembelian_header[a].Pembelian_Detail[b].jumlah,
                        total : pembelian_header[a].Pembelian_Detail[b].total
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else if(nama){
            const pembelian_header = await Pembelian_Header.findAll({
                include : [
                    {
                        model : Pembelian_Detail,
                        as : 'Pembelian_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    },
                    {
                        model : Supplier,
                        as : 'Supplier',
                        where : {
                            nama_supplier : {
                                [Op.substring] : nama
                            }
                        }
                    }
                ]
            })
            for(var a = 0;a < pembelian_header.length;a++){
                for(var b = 0; b < pembelian_header[a].Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_pembelian : pembelian_header[a].id_pembelian,
                        id_pesanan_pembelian : pembelian_header[a].id_pesanan_pembelian ? pembelian_header[a].id_pesanan_pembelian : '-' ,
                        id_barang : pembelian_header[a].Pembelian_Detail[b].id_barang,
                        tanggal_pembelian : pembelian_header[a].tanggal_pembelian,
                        nama_barang : pembelian_header[a].Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : pembelian_header[a].Pembelian_Detail[b].Barang_Header.harga_beli,
                        jumlah : pembelian_header[a].Pembelian_Detail[b].jumlah,
                        total : pembelian_header[a].Pembelian_Detail[b].total
                    })
                }
            }
            res.status(200).json(temp_array);
        }else if(dari && nama){
            const pembelian_header = await Pembelian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_pembelian : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Pembelian_Detail,
                        as : 'Pembelian_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    },
                    {
                        model : Supplier,
                        as : 'Supplier'
                    }
                ]
            })
            for(var a = 0;a < pembelian_header.length;a++){
                for(var b = 0; b < pembelian_header[a].Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_pembelian : pembelian_header[a].id_pembelian,
                        id_pesanan_pembelian : pembelian_header[a].id_pesanan_pembelian ? pembelian_header[a].id_pesanan_pembelian : '-' ,
                        id_barang : pembelian_header[a].Pembelian_Detail[b].id_barang,
                        tanggal_pembelian : pembelian_header[a].tanggal_pembelian,
                        nama_barang : pembelian_header[a].Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : pembelian_header[a].Pembelian_Detail[b].Barang_Header.harga_beli,
                        jumlah : pembelian_header[a].Pembelian_Detail[b].jumlah,
                        total : pembelian_header[a].Pembelian_Detail[b].total
                    })
                }
            }
            res.status(200).json(temp_array);
        }else{
            const pembelian_header = await Pembelian_Header.findAll({
                include : [
                    {
                        model : Pembelian_Detail,
                        as : 'Pembelian_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    },
                    {
                        model : Supplier,
                        as : 'Supplier'
                    }
                ]
            })
            for(var a = 0;a < pembelian_header.length;a++){
                for(var b = 0; b < pembelian_header[a].Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_pembelian : pembelian_header[a].id_pembelian,
                        id_pesanan_pembelian : pembelian_header[a].id_pesanan_pembelian ? pembelian_header[a].id_pesanan_pembelian : '-' ,
                        id_barang : pembelian_header[a].Pembelian_Detail[b].id_barang,
                        tanggal_pembelian : pembelian_header[a].tanggal_pembelian,
                        nama_barang : pembelian_header[a].Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : pembelian_header[a].Pembelian_Detail[b].Barang_Header.harga_beli,
                        jumlah : pembelian_header[a].Pembelian_Detail[b].jumlah,
                        total : pembelian_header[a].Pembelian_Detail[b].total
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
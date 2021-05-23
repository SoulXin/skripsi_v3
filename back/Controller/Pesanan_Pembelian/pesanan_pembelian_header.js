const Pesanan_Pembelian_Header = require('../../Model/Pesanan_Pembelian/pesanan_pembelian_header');
const Supplier = require('../../Model/Supplier/supplier');
const { Op } = require("sequelize");
const Pesanan_Pembelian_Detail = require('../../Model/Pesanan_Pembelian/pesanan_pembelian_detail');
const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Barang_Header = require('../../Model/Barang/barang_header');

exports.register = (req,res) => {
    const {tanggal_pemesanan,id_supplier,grand_total} = req.body;
    Pesanan_Pembelian_Header.create({
        tanggal_pemesanan : tanggal_pemesanan,
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
    Pesanan_Pembelian_Header.findAll({
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pesanan_Pembelian_Detail,
                as : 'Pesanan_Pembelian_Detail'
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
    Pesanan_Pembelian_Header.findAll({
        include : [
            {
                model : Supplier,
                as : 'Supplier'
            },
            {
                model : Pesanan_Pembelian_Detail,
                as : 'Pesanan_Pembelian_Detail'
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
    Pesanan_Pembelian_Header.findOne({
        where : {
            id_pesanan_pembelian : id
        },
        include : [
            {
                model : Supplier,
                as : 'Supplier'
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

exports.search = (req,res) => {
    const {tanggal_pemesanan} = req.body;
    Pesanan_Pembelian_Header.findAll({
        where : {
            tanggal_pemesanan : tanggal_pemesanan
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
    const {tanggal_pemesanan,id_supplier,grand_total,status} = req.body;
    Pesanan_Pembelian_Header.update({
        tanggal_pemesanan : tanggal_pemesanan,
        id_supplier : id_supplier,
        grand_total : grand_total,
        status : status
    },{
        where : {
            id_pesanan_pembelian : id
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
    Pesanan_Pembelian_Header.destroy({
        where : {
            id_pesanan_pembelian : id
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
    const {tanggal_pemesanan} = req.body;
    Pesanan_Pembelian_Header.findAll({
        where : {
            tanggal_pemesanan : tanggal_pemesanan
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

exports.search_date = async (req,res) => {
    const {dari,sampai,nama} = req.body;
    try{
        if(dari && sampai && nama){
            const response = await Pesanan_Pembelian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_pemesanan : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
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
                    },
                    {
                        model : Pesanan_Pembelian_Detail,
                        as : 'Pesanan_Pembelian_Detail'
                    }
                ]
            })
            res.status(200).json(response);
        }else if(dari && sampai){
            const response = await Pesanan_Pembelian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_pemesanan : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier'
                    },
                    {
                        model : Pesanan_Pembelian_Detail,
                        as : 'Pesanan_Pembelian_Detail'
                    }
                ]
            })
            res.status(200).json(response);
        }else if(nama){
            const response = await Pesanan_Pembelian_Header.findAll({
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier',
                        where : {
                            nama_supplier : {
                                [Op.substring] : nama
                            }
                        }
                    },
                    {
                        model : Pesanan_Pembelian_Detail,
                        as : 'Pesanan_Pembelian_Detail'
                    }
                ]
            })
            res.status(200).json(response);
        }else{
            const response = await Pesanan_Pembelian_Header.findAll({
                include : [
                    {
                        model : Supplier,
                        as : 'Supplier'
                    },
                    {
                        model : Pesanan_Pembelian_Detail,
                        as : 'Pesanan_Pembelian_Detail'
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

exports.laporan_per_item = async (req,res) => {
    const {dari,sampai,nama} = req.body;
    const temp_array = [];

    try{
        if(dari && sampai && nama){
            const pesanan_pembelian_header = await Pesanan_Pembelian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_pemesanan : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Pesanan_Pembelian_Detail,
                        as : 'Pesanan_Pembelian_Detail',
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
            for(var a = 0;a < pesanan_pembelian_header.length;a++){
                for(var b = 0; b < pesanan_pembelian_header[a].Pesanan_Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_pesanan_pembelian : pesanan_pembelian_header[a].id_pesanan_pembelian,
                        id_barang : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].id_barang,
                        tanggal_penjualan : pesanan_pembelian_header[a].tanggal_pemesanan,
                        nama_barang : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].harga_beli,
                        jumlah : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].jumlah,
                        total : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].total
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else if(dari && sampai){
            const pesanan_pembelian_header = await Pesanan_Pembelian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_pemesanan : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Pesanan_Pembelian_Detail,
                        as : 'Pesanan_Pembelian_Detail',
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
            for(var a = 0;a < pesanan_pembelian_header.length;a++){
                for(var b = 0; b < pesanan_pembelian_header[a].Pesanan_Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_pesanan_pembelian : pesanan_pembelian_header[a].id_pesanan_pembelian,
                        id_barang : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].id_barang,
                        tanggal_penjualan : pesanan_pembelian_header[a].tanggal_pemesanan,
                        nama_barang : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].harga_beli,
                        jumlah : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].jumlah,
                        total : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].total
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else if(nama){
            const pesanan_pembelian_header = await Pesanan_Pembelian_Header.findAll({
                include : [
                    {
                        model : Pesanan_Pembelian_Detail,
                        as : 'Pesanan_Pembelian_Detail',
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
            for(var a = 0;a < pesanan_pembelian_header.length;a++){
                for(var b = 0; b < pesanan_pembelian_header[a].Pesanan_Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_pesanan_pembelian : pesanan_pembelian_header[a].id_pesanan_pembelian,
                        id_barang : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].id_barang,
                        tanggal_penjualan : pesanan_pembelian_header[a].tanggal_pemesanan,
                        nama_barang : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].harga_beli,
                        jumlah : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].jumlah,
                        total : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].total
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else{
            const pesanan_pembelian_header = await Pesanan_Pembelian_Header.findAll({
                include : [
                    {
                        model : Pesanan_Pembelian_Detail,
                        as : 'Pesanan_Pembelian_Detail',
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
            for(var a = 0;a < pesanan_pembelian_header.length;a++){
                for(var b = 0; b < pesanan_pembelian_header[a].Pesanan_Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_pesanan_pembelian : pesanan_pembelian_header[a].id_pesanan_pembelian,
                        id_barang : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].id_barang,
                        tanggal_penjualan : pesanan_pembelian_header[a].tanggal_pemesanan,
                        nama_barang : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].harga_beli,
                        jumlah : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].jumlah,
                        total : pesanan_pembelian_header[a].Pesanan_Pembelian_Detail[b].total
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
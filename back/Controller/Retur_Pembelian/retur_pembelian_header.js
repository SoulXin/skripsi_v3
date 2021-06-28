const Pembelian_Header = require('../../Model/Pembelian/pembelian_header');
const Retur_Pembelian_Detail = require('../../Model/Retur_Pembelian/retur_pembelian_detail');
const Retur_Pembelian_Header = require('../../Model/Retur_Pembelian/retur_pembelian_header');
const Supplier = require('../../Model/Supplier/supplier');
const Barang_Header = require('../../Model/Barang/barang_header');
const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {tanggal_retur,id_supplier,jenis_penggembalian,alasan_retur,grand_total } = req.body;
    Retur_Pembelian_Header.create({
        tanggal_retur : tanggal_retur,
        id_supplier : id_supplier,
        jenis_penggembalian : jenis_penggembalian,
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
    const {tanggal_retur,id_supplier,jenis_penggembalian,alasan_retur,grand_total} = req.body;
    Retur_Pembelian_Header.update({
        tanggal_retur : tanggal_retur,
        id_supplier : id_supplier,
        jenis_penggembalian : jenis_penggembalian,
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
                [Op.not] : [{id_supplier : null}]
            },include : [{model : Retur_Pembelian_Detail, as : 'Retur_Pembelian_Detail', attributes : ['id_pembelian']}]
        })
        for(var a = 0;a < retur.length;a++){
            if(tempNum.indexOf(retur[a].Retur_Pembelian_Detail[0].id_pembelian)){
                tempNum.push(retur[a].Retur_Pembelian_Detail[0].id_pembelian);
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

exports.search_date = async (req,res) => {
    const {dari, sampai,nama} = req.body;
    try{
        if(dari && sampai && nama){
            const response = await Retur_Pembelian_Header.findAll({
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
            const response = await Retur_Pembelian_Header.findAll({
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
            res.status(200).json(response);
        }else if(nama){
            const response = await Retur_Pembelian_Header.findAll({
                include : [
                    {
                        model : Retur_Pembelian_Detail,
                        as : 'Retur_Pembelian_Detail'
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
            res.status(200).json(response);
        }else{
            const response = await Retur_Pembelian_Header.findAll({
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
            res.status(200).json(response);
        }
    }catch(error){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
        res.status(400).end();
    }
}

exports.show_all_laporan = (req,res) => {
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

exports.laporan_per_item = async (req,res) => {
    const {dari,sampai,nama} = req.body;
    const temp_array = [];

    try{
        if(dari && sampai && nama){
            const retur_pembelian_header = await Retur_Pembelian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_retur : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Retur_Pembelian_Detail,
                        as : 'Retur_Pembelian_Detail',
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
            for(var a = 0;a < retur_pembelian_header.length;a++){
                for(var b = 0; b < retur_pembelian_header[a].Retur_Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_retur_pembelian : retur_pembelian_header[a].id_retur_pembelian,
                        id_pembelian : retur_pembelian_header[a].Retur_Pembelian_Detail[b].id_pembelian,
                        id_supplier : retur_pembelian_header[a].Supplier.id_supplier,
                        id_barang : retur_pembelian_header[a].Retur_Pembelian_Detail[b].id_barang,
                        tanggal_retur : retur_pembelian_header[a].tanggal_retur,
                        nama_barang : retur_pembelian_header[a].Retur_Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : retur_pembelian_header[a].Retur_Pembelian_Detail[b].Barang_Header.harga_beli,
                        jumlah : retur_pembelian_header[a].Retur_Pembelian_Detail[b].jumlah,
                        total : retur_pembelian_header[a].Retur_Pembelian_Detail[b].total
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else if(dari && sampai){
            const retur_pembelian_header = await Retur_Pembelian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_retur : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Retur_Pembelian_Detail,
                        as : 'Retur_Pembelian_Detail',
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
            for(var a = 0;a < retur_pembelian_header.length;a++){
                for(var b = 0; b < retur_pembelian_header[a].Retur_Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_retur_pembelian : retur_pembelian_header[a].id_retur_pembelian,
                        id_pembelian : retur_pembelian_header[a].Retur_Pembelian_Detail[b].id_pembelian,
                        id_supplier : retur_pembelian_header[a].Supplier.id_supplier,
                        id_barang : retur_pembelian_header[a].Retur_Pembelian_Detail[b].id_barang,
                        tanggal_retur : retur_pembelian_header[a].tanggal_retur,
                        nama_barang : retur_pembelian_header[a].Retur_Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : retur_pembelian_header[a].Retur_Pembelian_Detail[b].Barang_Header.harga_beli,
                        jumlah : retur_pembelian_header[a].Retur_Pembelian_Detail[b].jumlah,
                        total : retur_pembelian_header[a].Retur_Pembelian_Detail[b].total
                    })
                }
            }
            res.status(200).json(temp_array);
        }else if(nama){
            const retur_pembelian_header = await Retur_Pembelian_Header.findAll({
                include : [
                    {
                        model : Retur_Pembelian_Detail,
                        as : 'Retur_Pembelian_Detail',
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
            for(var a = 0;a < retur_pembelian_header.length;a++){
                for(var b = 0; b < retur_pembelian_header[a].Retur_Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_retur_pembelian : retur_pembelian_header[a].id_retur_pembelian,
                        id_pembelian : retur_pembelian_header[a].Retur_Pembelian_Detail[b].id_pembelian,
                        id_supplier : retur_pembelian_header[a].Supplier.id_supplier,
                        id_barang : retur_pembelian_header[a].Retur_Pembelian_Detail[b].id_barang,
                        tanggal_retur : retur_pembelian_header[a].tanggal_retur,
                        nama_barang : retur_pembelian_header[a].Retur_Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : retur_pembelian_header[a].Retur_Pembelian_Detail[b].Barang_Header.harga_beli,
                        jumlah : retur_pembelian_header[a].Retur_Pembelian_Detail[b].jumlah,
                        total : retur_pembelian_header[a].Retur_Pembelian_Detail[b].total
                    })
                }
            }
            res.status(200).json(temp_array);
        }else{
            const retur_pembelian_header = await Retur_Pembelian_Header.findAll({
                include : [
                    {
                        model : Retur_Pembelian_Detail,
                        as : 'Retur_Pembelian_Detail',
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
            for(var a = 0;a < retur_pembelian_header.length;a++){
                for(var b = 0; b < retur_pembelian_header[a].Retur_Pembelian_Detail.length ;b++){
                    temp_array.push({
                        id_retur_pembelian : retur_pembelian_header[a].id_retur_pembelian,
                        id_pembelian : retur_pembelian_header[a].Retur_Pembelian_Detail[b].id_pembelian,
                        id_supplier : retur_pembelian_header[a].Supplier.id_supplier,
                        id_barang : retur_pembelian_header[a].Retur_Pembelian_Detail[b].id_barang,
                        tanggal_retur : retur_pembelian_header[a].tanggal_retur,
                        nama_barang : retur_pembelian_header[a].Retur_Pembelian_Detail[b].Barang_Header.nama_barang,
                        harga : retur_pembelian_header[a].Retur_Pembelian_Detail[b].Barang_Header.harga_beli,
                        jumlah : retur_pembelian_header[a].Retur_Pembelian_Detail[b].jumlah,
                        total : retur_pembelian_header[a].Retur_Pembelian_Detail[b].total
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
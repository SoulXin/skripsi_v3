const Retur_Penjualan_Detail = require('../../Model/Retur_Penjualan/retur_penjualan_detail');
const Retur_Penjualan_Header = require('../../Model/Retur_Penjualan/retur_penjualan_header');
const Penjualan_Detail = require('../../Model/Penjualan/penjualan_detail');
const Penjualan_Header = require('../../Model/Penjualan/penjualan_header');
const Barang_Header = require('../../Model/Barang/barang_header');

const { Op } = require("sequelize");

exports.register = (req,res) => {
    const {tanggal_retur,alasan_retur,jenis_penggembalian,grand_total } = req.body;
    Retur_Penjualan_Header.create({
        tanggal_retur : tanggal_retur,
        jenis_penggembalian,jenis_penggembalian,
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
                as : 'Retur_Penjualan_Detail',
                include : [
                    {
                        model : Penjualan_Header,
                        as : 'Penjualan_Header'
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

exports.update = (req,res) => {
    const {id} = req.params;
    const {tanggal_retur,jenis_penggembalian,alasan_retur,grand_total} = req.body;
    Retur_Penjualan_Header.update({
        tanggal_retur : tanggal_retur,
        jenis_penggembalian : jenis_penggembalian,
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
            where : {
                [Op.not] : [{grand_total : 0}]
            },
            include : [{model : Retur_Penjualan_Detail, as : 'Retur_Penjualan_Detail', attributes : ['id_penjualan']}]
        });

        for(var a = 0;a < retur.length;a++){
            if(tempNum.indexOf(retur[a].Retur_Penjualan_Detail.id_penjualan)){
                tempNum.push(retur[a].Retur_Penjualan_Detail[0].id_penjualan);
            }
        }
        const penjualan = await Penjualan_Header.findAll({
            include : [
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

exports.search_date = async (req,res) => {
    const {dari, sampai,nama} = req.body;
    try {
        if(dari && sampai && nama){
            const response = await Retur_Penjualan_Header.findAll({
                where : {
                    tanggal_retur : {
                        [Op.between] : [dari,sampai]
                    }
                },
                include : [
                    {
                        model : Retur_Penjualan_Detail,
                        as : 'Retur_Penjualan_Detail',
                        include : [
                            {
                                model : Penjualan_Header,
                                as : 'Penjualan_Header',
                                where : {
                                    [Op.or] : [
                                        { nama_pelanggan : nama },
                                        { nomor_polisi : nama }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            })
            res.status(200).json(response);
        }else if(dari && sampai){
            const response = await Retur_Penjualan_Header.findAll({
                where : {
                    tanggal_retur : {
                        [Op.between] : [dari,sampai]
                    }
                },
                include : [
                    {
                        model : Retur_Penjualan_Detail,
                        as : 'Retur_Penjualan_Detail',
                        include : [
                            {
                                model : Penjualan_Header,
                                as : 'Penjualan_Header',
                            }
                        ]
                    }
                ]
            })
            res.status(200).json(response);
        }else if(nama){
            const response = await Retur_Penjualan_Header.findAll({
                include : [
                    {
                        model : Retur_Penjualan_Detail,
                        as : 'Retur_Penjualan_Detail',
                        include : [
                            {
                                model : Penjualan_Header,
                                as : 'Penjualan_Header',
                                where : {
                                    [Op.or] : [
                                        { nama_pelanggan : nama },
                                        { nomor_polisi : nama }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            })
            res.status(200).json(response);
        }else{
            const response = await Retur_Penjualan_Header.findAll({
                include : [
                    {
                        model : Retur_Penjualan_Detail,
                        as : 'Retur_Penjualan_Detail',
                        include : [
                            {
                                model : Penjualan_Header,
                                as : 'Penjualan_Header'
                            }
                        ]
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
            const retur_penjualan_header = await Retur_Penjualan_Header.findAll({
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
                        model : Retur_Penjualan_Detail,
                        as : 'Retur_Penjualan_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            },
                            {
                                model : Penjualan_Header,
                                as : 'Penjualan_Header',
                                where : {
                                    [Op.or] : [
                                            { nama_pelanggan : nama} ,
                                            { nomor_polisi : nama }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            })
            for(var a = 0;a < retur_penjualan_header.length;a++){
                for(var b = 0; b < retur_penjualan_header[a].Retur_Penjualan_Detail.length ;b++){
                    temp_array.push({
                        id_retur_penjualan : retur_penjualan_header[a].id_retur_penjualan,
                        id_penjualan : retur_penjualan_header[a].Retur_Penjualan_Detail[b].id_penjualan,
                        id_barang : retur_penjualan_header[a].Retur_Penjualan_Detail[b].id_barang,
                        nama_pelanggan : retur_penjualan_header[a].Retur_Penjualan_Detail[b].Penjualan_Header.nama_pelanggan,
                        nomor_polisi : retur_penjualan_header[a].Retur_Penjualan_Detail[b].Penjualan_Header.nomor_polisi,
                        tanggal_retur : retur_penjualan_header[a].tanggal_retur,
                        nama_barang : retur_penjualan_header[a].Retur_Penjualan_Detail[b].Barang_Header.nama_barang,
                        harga : retur_penjualan_header[a].Retur_Penjualan_Detail[b].harga_jual,
                        jumlah : retur_penjualan_header[a].Retur_Penjualan_Detail[b].jumlah,
                        total : retur_penjualan_header[a].Retur_Penjualan_Detail[b].total
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else if(dari && sampai){
            const retur_penjualan_header = await Retur_Penjualan_Header.findAll({
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
                        model : Retur_Penjualan_Detail,
                        as : 'Retur_Penjualan_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    }
                ]
            })
            for(var a = 0;a < retur_penjualan_header.length;a++){
                for(var b = 0; b < retur_penjualan_header[a].Retur_Penjualan_Detail.length ;b++){
                    temp_array.push({
                        id_retur_penjualan : retur_penjualan_header[a].id_retur_penjualan,
                        id_penjualan : retur_penjualan_header[a].Retur_Penjualan_Detail[b].id_penjualan,
                        id_barang : retur_penjualan_header[a].Retur_Penjualan_Detail[b].id_barang,
                        tanggal_retur : retur_penjualan_header[a].tanggal_retur,
                        nama_barang : retur_penjualan_header[a].Retur_Penjualan_Detail[b].Barang_Header.nama_barang,
                        harga : retur_penjualan_header[a].Retur_Penjualan_Detail[b].harga_jual,
                        jumlah : retur_penjualan_header[a].Retur_Penjualan_Detail[b].jumlah,
                        total : retur_penjualan_header[a].Retur_Penjualan_Detail[b].total
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else if(nama){
            const retur_penjualan_header = await Retur_Penjualan_Header.findAll({
                include : [
                    {
                        model : Retur_Penjualan_Detail,
                        as : 'Retur_Penjualan_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            },
                            {        
                                model : Penjualan_Header,
                                as : 'Penjualan_Header',
                                where : {
                                    [Op.or] : [
                                            { nama_pelanggan : nama} ,
                                            { nomor_polisi : nama }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            })
            for(var a = 0;a < retur_penjualan_header.length;a++){
                for(var b = 0; b < retur_penjualan_header[a].Retur_Penjualan_Detail.length ;b++){
                    temp_array.push({
                        id_retur_penjualan : retur_penjualan_header[a].id_retur_penjualan,
                        id_penjualan : retur_penjualan_header[a].Retur_Penjualan_Detail[b].id_penjualan,
                        id_barang : retur_penjualan_header[a].Retur_Penjualan_Detail[b].id_barang,
                        nama_pelanggan : retur_penjualan_header[a].Retur_Penjualan_Detail[b].Penjualan_Header.nama_pelanggan,
                        nomor_polisi : retur_penjualan_header[a].Retur_Penjualan_Detail[b].Penjualan_Header.nomor_polisi,
                        tanggal_retur : retur_penjualan_header[a].tanggal_retur,
                        nama_barang : retur_penjualan_header[a].Retur_Penjualan_Detail[b].Barang_Header.nama_barang,
                        harga : retur_penjualan_header[a].Retur_Penjualan_Detail[b].harga_jual,
                        jumlah : retur_penjualan_header[a].Retur_Penjualan_Detail[b].jumlah,
                        total : retur_penjualan_header[a].Retur_Penjualan_Detail[b].total
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else{
            const retur_penjualan_header = await Retur_Penjualan_Header.findAll({
                include : [
                    {
                        model : Retur_Penjualan_Detail,
                        as : 'Retur_Penjualan_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    }
                ]
            })
            for(var a = 0;a < retur_penjualan_header.length;a++){
                for(var b = 0; b < retur_penjualan_header[a].Retur_Penjualan_Detail.length ;b++){
                    temp_array.push({
                        id_retur_penjualan : retur_penjualan_header[a].id_retur_penjualan,
                        id_penjualan : retur_penjualan_header[a].Retur_Penjualan_Detail[b].id_penjualan,
                        id_barang : retur_penjualan_header[a].Retur_Penjualan_Detail[b].id_barang,
                        tanggal_retur : retur_penjualan_header[a].tanggal_retur,
                        nama_barang : retur_penjualan_header[a].Retur_Penjualan_Detail[b].Barang_Header.nama_barang,
                        harga : retur_penjualan_header[a].Retur_Penjualan_Detail[b].harga_jual,
                        jumlah : retur_penjualan_header[a].Retur_Penjualan_Detail[b].jumlah,
                        total : retur_penjualan_header[a].Retur_Penjualan_Detail[b].total
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
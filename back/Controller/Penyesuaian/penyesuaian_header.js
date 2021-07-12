const Peneysuaian_Header = require('../../Model/Penyesuaian/penyesuaian_header');
const { Op } = require("sequelize");
const Penyesuaian_Detail = require('../../Model/Penyesuaian/penyesuaian_detail');
const Penyesuaian_Header = require('../../Model/Penyesuaian/penyesuaian_header');
const Barang_Header = require('../../Model/Barang/barang_header');

exports.register = (req,res) => {
    const {tanggal_penyesuaian} = req.body;
    Peneysuaian_Header.create({
        tanggal_penyesuaian : tanggal_penyesuaian
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
exports.show_all = (req,res) => {
    Penyesuaian_Detail.findAll({
        include : [
            {
                model : Penyesuaian_Header,
                as : 'Penyesuaian_Header'
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

exports.delete = (req,res) => {
    const {id} = req.params;
    Peneysuaian_Header.destroy({
        where : {
            id_penyesuaian : id
        }
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
    const {tanggal_penyesuaian} = req.body;
    Peneysuaian_Header.update({
        tanggal_penyesuaian : tanggal_penyesuaian
    },{
        where : {
            id_penyesuaian : id
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

    Penyesuaian_Header.findAll({
        where : {
            [Op.and] : [
                {
                    tanggal_penyesuaian : {
                        [Op.between] : [dari,sampai]
                    }
                }
            ]
        },
        include : [
            {
                model : Penyesuaian_Detail,
                as : 'Penyesuaian_Detail',
                include : [
                    {
                        model : Barang_Header,
                        as : 'Barang_Header'
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

exports.laporan_per_item = async (req,res) => {
    const {dari,sampai} = req.body;
    const temp_array = [];

    try{
        if(dari && sampai){
            const penyesuaian_header = await Penyesuaian_Header.findAll({
                where : {
                    [Op.and] : [
                        {
                            tanggal_penyesuaian : {
                                [Op.between] : [dari,sampai]
                            }
                        }
                    ]
                },
                include : [
                    {
                        model : Penyesuaian_Detail,
                        as : 'Penyesuaian_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    }
                ]
            })
            for(var a = 0;a < penyesuaian_header.length;a++){
                for(var b = 0; b < penyesuaian_header[a].Penyesuaian_Detail.length ;b++){
                    temp_array.push({
                        id_penyesuaian : penyesuaian_header[a].id_penyesuaian,
                        id_barang : penyesuaian_header[a].Penyesuaian_Detail[b].id_barang,
                        tanggal_penyesuaian : penyesuaian_header[a].tanggal_penyesuaian,
                        nama_barang : penyesuaian_header[a].Penyesuaian_Detail[b].Barang_Header.nama_barang,
                        jumlah_fisik : penyesuaian_header[a].Penyesuaian_Detail[b].jumlah_fisik,
                        jumlah_sistem : penyesuaian_header[a].Penyesuaian_Detail[b].jumlah_sistem,
                        penyesuaian : penyesuaian_header[a].Penyesuaian_Detail[b].penyesuaian,
                    })
                }
            }
    
            res.status(200).json(temp_array);
        }else{
            const penyesuaian_header = await Penyesuaian_Header.findAll({
                include : [
                    {
                        model : Penyesuaian_Detail,
                        as : 'Penyesuaian_Detail',
                        include : [
                            {
                                model : Barang_Header,
                                as : 'Barang_Header'
                            }
                        ]
                    }
                ]
            })
            for(var a = 0;a < penyesuaian_header.length;a++){
                for(var b = 0; b < penyesuaian_header[a].Penyesuaian_Detail.length ;b++){
                    temp_array.push({
                        id_penyesuaian : penyesuaian_header[a].id_penyesuaian,
                        id_barang : penyesuaian_header[a].Penyesuaian_Detail[b].id_barang,
                        tanggal_penyesuaian : penyesuaian_header[a].tanggal_penyesuaian,
                        nama_barang : penyesuaian_header[a].Penyesuaian_Detail[b].Barang_Header.nama_barang,
                        jumlah_fisik : penyesuaian_header[a].Penyesuaian_Detail[b].jumlah_fisik,
                        jumlah_sistem : penyesuaian_header[a].Penyesuaian_Detail[b].jumlah_sistem,
                        penyesuaian : penyesuaian_header[a].Penyesuaian_Detail[b].penyesuaian,
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
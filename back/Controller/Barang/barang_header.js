const Barang_Header = require('../../Model/Barang/barang_header');
const Barang_Detail = require('../../Model/Barang/barang_detail');
const Kategori = require('../../Model/Kategori/kategori');
const { Op } = require("sequelize");
const Keranjang_Barang = require('../../Model/Keranjang/keranjang_barang');
const { Sequelize } = require('../../Database/db');

exports.register = (req,res) => {
    const {nama_barang,merek_barang,jenis_kereta,keterangan,harga_beli,harga_jual} = req.body;
    if(req.file){
        Barang_Header.create({
            nama_barang : nama_barang,
            merek_barang : merek_barang,
            jenis_kereta : jenis_kereta,
            keterangan : keterangan,
            harga_beli : harga_beli,
            harga_jual : harga_jual,
            gambar : req.file.filename
        })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
            res.status(400).end();
        });
    }else{
        Barang_Header.create({
            nama_barang : nama_barang,
            merek_barang : merek_barang,
            jenis_kereta : jenis_kereta,
            keterangan : keterangan,
            harga_beli : harga_beli,
            harga_jual : harga_jual,
        })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
            res.status(400).end();
        });
    }
}

exports.show_all = (req,res) => {
    Barang_Header.findAll({
        where : {
            aktif : 1
        },
        include : [
            {
                model : Barang_Detail,
                as : 'Barang_Detail',
                include : [{ model : Kategori, as : 'Kategori' }]
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
    Barang_Header.findOne({
        where : {
            id_barang : id
        },
        include : [
            {
                model : Barang_Detail,
                as : 'Barang_Detail',
                include : [
                    {
                        model : Kategori,
                        as : 'Kategori'
                    }
                ]
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

exports.search = (req,res) => {
    const {nama_barang,jenis_kereta,aktif} = req.body;
    Barang_Header.findAll({
        where : {
            [Op.and] : [{
                [Op.or] : [{
                    nama_barang : {
                        [Op.substring] : nama_barang
                    },
                    jenis_kereta : {
                        [Op.substring] : jenis_kereta
                    }
                }],
                aktif : aktif
            }]
        },
        include : [
            {
                model : Barang_Detail,
                as : 'Barang_Detail',
                where : {
                    stok : {
                        [Op.gt] : 1
                    }
                },
                include : [{ model : Kategori, as : 'Kategori' }]
            }
        ]
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
    const {nama_barang,merek_barang,jenis_kereta,keterangan,harga_beli,harga_jual} = req.body;

    if(req.file){ // => kondisi jika gambarnya diganti
        Barang_Header.update({
            nama_barang : nama_barang,
            merek_barang : merek_barang,
            jenis_kereta : jenis_kereta,
            keterangan : keterangan,
            harga_beli : harga_beli,
            harga_jual : harga_jual,
            gambar : req.file.filename
        },{
            where : {
                id_barang : id
            }
        })
        .then((result) => {
            res.status(200).json(result);
    
        }).catch((err) => {
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
            res.status(400).end();
        });
    }else{ // => kondisi jika gambarnya tidak diganti
        Barang_Header.update({
            nama_barang : nama_barang,
            merek_barang : merek_barang,
            jenis_kereta : jenis_kereta,
            keterangan : keterangan,
            harga_beli : harga_beli,
            harga_jual : harga_jual,
        },{
            where : {
                id_barang : id
            }
        })
        .then((result) => {
            res.status(200).json(result);
    
        }).catch((err) => {
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
            res.status(400).end();
        });
    }
}

exports.change_status = (req,res) => {
    const {id} = req.params;
    const {aktif} = req.body;

    Barang_Header.update({
        aktif : aktif
    },{where : {
            id_barang : id
        }
    })
    .then((result) => {
        res.status(200).send();
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}

exports.show_all_barang_keranjang = (req,res) => {
    const {id} = req.params;
    Barang_Header.findAll({
        include : [
            {
                model : Barang_Detail,
                as : 'Barang_Detail'
            },
            {
                model : Keranjang_Barang,
                as : 'Keranjang_Barang',
                where : {
                    id_pelanggan : id
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

exports.show_all_limit = async (req,res) => {
    try{
        const temp = [];
        const first = await Barang_Header.findAll({
            where : {
                aktif : 1
            },
            include : [{
                model : Barang_Detail,
                as : 'Barang_Detail',
            }]
        })

        for(var a = 0;a < first.length;a++){
            const second = await Barang_Header.findOne({
                include : [{
                    model : Barang_Detail,
                    as : 'Barang_Detail',
                    where : {
                        stok : {
                            [Op.lte] : first[a].Barang_Detail.stok_minimal
                        },
                        id_barang : first[a].id_barang
                    },
                    include : [{ model : Kategori, as : 'Kategori' }]
                }] 
            });

            if(second){
                temp.push(second);
            }
        }

        res.status(200).json(temp);
    }catch(err){
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    }
    
}

exports.search_limit = (req,res) => {
    const {nama_barang,merek_barang,jenis_kereta} = req.body;
    Barang_Header.findAll({
        where : {
            [Op.and] : [{
                [Op.or] : [{
                    nama_barang : {
                        [Op.substring] : nama_barang
                    },
                    merek_barang : {
                        [Op.substring] : merek_barang
                    },
                    jenis_kereta : {
                        [Op.substring] : jenis_kereta
                    }
                }],
                aktif : 1
            }]
        },
        include : [
            {
                model : Barang_Detail,
                as : 'Barang_Detail',
                where : {
                    stok : {
                        [Op.lt] : 5
                    }
                },
                include : [{ model : Kategori, as : 'Kategori' }]
            }
        ]
    })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    })
}

exports.show_status = (req,res) => {
    const {status} = req.params;
    Barang_Header.findAll({
        where : {
            aktif : status
        },
        include : [
            {
                model : Barang_Detail,
                as : 'Barang_Detail',
                include : [{ model : Kategori, as : 'Kategori' }]
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
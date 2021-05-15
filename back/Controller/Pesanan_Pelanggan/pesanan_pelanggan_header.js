const Pesanan_Pelanggan_Header = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_header');
const { Op } = require("sequelize");
const Pelanggan = require('../../Model/Pelanggan/pelanggan');
const Pesanan_Pelanggan_Booking_Service = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_booking_service');
const Pesanan_Pelanggan_Pengantaran = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_pengantaran');
const Daerah_Pengantaran = require('../../Model/Daerah_Pengantaran/daerah_pengantaran');
const Pesanan_Pelanggan_Detail = require('../../Model/Pesanan_Pelanggan/pesanan_pelanggan_detail');
const Barang_Header = require('../../Model/Barang/barang_header');
const Jenis_Service = require('../../Model/Jenis_Sevice/jenis_service');
const Barang_Detail = require('../../Model/Barang/barang_detail');

exports.register = (req,res) => {
    const {id_pelanggan,tanggal_pemesanan,status_pesanan,grand_total} = req.body;
    console.log(tanggal_pemesanan);
    if(req.file){
        Pesanan_Pelanggan_Header.create({
            id_pelanggan : id_pelanggan,
            tanggal_pemesanan : tanggal_pemesanan,
            status_pesanan : status_pesanan,
            bukti_pembayaran_pelanggan : req.file.filename,
            grand_total : grand_total
        })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
            res.status(400).end();
        });
    }else{
        Pesanan_Pelanggan_Header.create({
            id_pelanggan : id_pelanggan,
            tanggal_pemesanan : tanggal_pemesanan,
            status_pesanan : status_pesanan,
            grand_total : grand_total
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
    Pesanan_Pelanggan_Header.findAll({
        include : [
            {
                model : Pesanan_Pelanggan_Booking_Service,
                as : 'Pesanan_Pelanggan_Booking_Service',
                include : [
                    {
                        model : Jenis_Service,
                        as : 'Jenis_Service'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Pengantaran,
                as : 'Pesanan_Pelanggan_Pengantaran',
                include : [
                    {   
                        model : Daerah_Pengantaran,
                        as : 'Daerah_Pengantaran'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Detail,
                as : 'Pesanan_Pelanggan_Detail',
                include : [
                    {
                        model : Barang_Header,
                        as : 'Barang_Header'
                    }
                ]
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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
    const {id,id_pesanan_pelanggan} = req.params;
    Pesanan_Pelanggan_Header.findOne({
        where : {
            [Op.and] : [
                {id_pelanggan : id},
                {id_pesanan_pelanggan : id_pesanan_pelanggan}
            ]
        },
        include : [
            {
                model : Pesanan_Pelanggan_Booking_Service,
                as : 'Pesanan_Pelanggan_Booking_Service',
                include : [
                    {
                        model : Jenis_Service,
                        as : 'Jenis_Service'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Pengantaran,
                as : 'Pesanan_Pelanggan_Pengantaran',
                include : [
                    {   
                        model : Daerah_Pengantaran,
                        as : 'Daerah_Pengantaran'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Detail,
                as : 'Pesanan_Pelanggan_Detail',
                include : [
                    {
                        model : Barang_Header,
                        as : 'Barang_Header',
                        include : [
                            {
                                model : Barang_Detail,
                                as : 'Barang_Detail',
                            }
                        ]
                    }
                ]
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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
    const {id_pelanggan,tanggal_pemesanan,status_pemesanan,grand_total,status} = req.body;
    if(req.file){ // => kondisi jika gambarnya diganti
        Pesanan_Pelanggan_Header.update({
            id_pelanggan : id_pelanggan,
            tanggal_pemesanan : tanggal_pemesanan,
            status_pemesanan : status_pemesanan,
            bukti_pembayaran_pelanggan : req.file.filename,
            grand_total : grand_total,
            status : status
        },{
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
    }else{
        Pesanan_Pelanggan_Header.update({
            id_pelanggan : id_pelanggan,
            tanggal_pemesanan : tanggal_pemesanan,
            status_pemesanan : status_pemesanan,
            grand_total : grand_total,
            status : status
        },{
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
}

exports.delete = (req,res) => {
    const {id} = req.params;
    Pesanan_Pelanggan_Header.destroy({
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

exports.show_all_status = (req,res) => {
    const {status} = req.params;
    Pesanan_Pelanggan_Header.findAll({
        where : {
            status : status
        },
        include : [
            {
                model : Pesanan_Pelanggan_Booking_Service,
                as : 'Pesanan_Pelanggan_Booking_Service',
                include : [
                    {
                        model : Jenis_Service,
                        as : 'Jenis_Service'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Pengantaran,
                as : 'Pesanan_Pelanggan_Pengantaran',
                include : [
                    {   
                        model : Daerah_Pengantaran,
                        as : 'Daerah_Pengantaran'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Detail,
                as : 'Pesanan_Pelanggan_Detail',
                include : [
                    {
                        model : Barang_Header,
                        as : 'Barang_Header'
                    }
                ]
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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

exports.show_all_success = (req,res) => {
    Pesanan_Pelanggan_Header.findAll({
        where : {
            [Op.or] : [
                { status : 'Proses' },
                { status : 'Kirim' },
                { status : 'Selesai' }
            ]
        },
        include : [
            {
                model : Pesanan_Pelanggan_Booking_Service,
                as : 'Pesanan_Pelanggan_Booking_Service',
                include : [
                    {
                        model : Jenis_Service,
                        as : 'Jenis_Service'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Pengantaran,
                as : 'Pesanan_Pelanggan_Pengantaran',
                include : [
                    {   
                        model : Daerah_Pengantaran,
                        as : 'Daerah_Pengantaran'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Detail,
                as : 'Pesanan_Pelanggan_Detail',
                include : [
                    {
                        model : Barang_Header,
                        as : 'Barang_Header'
                    }
                ]
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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
    Pesanan_Pelanggan_Header.findAll({
        where : {
            tanggal_pemesanan : {
                [Op.between] : [dari,sampai]
            }
        },
        include : [
            {
                model : Pesanan_Pelanggan_Booking_Service,
                as : 'Pesanan_Pelanggan_Booking_Service',
                include : [
                    {
                        model : Jenis_Service,
                        as : 'Jenis_Service'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Pengantaran,
                as : 'Pesanan_Pelanggan_Pengantaran',
                include : [
                    {   
                        model : Daerah_Pengantaran,
                        as : 'Daerah_Pengantaran'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Detail,
                as : 'Pesanan_Pelanggan_Detail',
                include : [
                    {
                        model : Barang_Header,
                        as : 'Barang_Header'
                    }
                ]
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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

exports.show_detail_pesanan = (req,res) => {
    const {id,id_pesanan_pelanggan} = req.params;
    Pesanan_Pelanggan_Header.findOne({
        where : {
            [Op.and] : [
                {id_pelanggan : id},
                {id_pesanan_pelanggan : id_pesanan_pelanggan}
            ]
            
        },
        include : [
            {
                model : Pesanan_Pelanggan_Booking_Service,
                as : 'Pesanan_Pelanggan_Booking_Service',
                include : [
                    {
                        model : Jenis_Service,
                        as : 'Jenis_Service'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Pengantaran,
                as : 'Pesanan_Pelanggan_Pengantaran',
                include : [
                    {   
                        model : Daerah_Pengantaran,
                        as : 'Daerah_Pengantaran'
                    }
                ]
            },
            {
                model : Pesanan_Pelanggan_Detail,
                as : 'Pesanan_Pelanggan_Detail',
                include : [
                    {
                        model : Barang_Header,
                        as : 'Barang_Header',
                        include : [
                            {
                                model : Barang_Detail,
                                as : 'Barang_Detail',
                            }
                        ]
                    }
                ]
            },
            {
                model : Pelanggan,
                as : 'Pelanggan'
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
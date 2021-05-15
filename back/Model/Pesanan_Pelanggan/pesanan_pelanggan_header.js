const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Penjualan_Header = require('../Penjualan/penjualan_header');
const Pesanan_Pelanggan_Booking_Service = require('./pesanan_pelanggan_booking_service');
const Pesanan_Pelanggan_Detail = require('./pesanan_pelanggan_detail');
const Pesanan_Pelanggan_Pengantaran = require('./pesanan_pelanggan_pengantaran');

const Pesanan_Pelanggan_Header = db.sequelize.define('pesanan_pelanggan_header',{
    id_pesanan_pelanggan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pelanggan : {
        type : Sequelize.INTEGER
    },
    tanggal_pemesanan : {
        type : Sequelize.STRING
    },
    status_pesanan : {
        type : Sequelize.INTEGER
    },
    bukti_pembayaran_pelanggan : {
        type : Sequelize.STRING
    },
    grand_total : {
        type : Sequelize.STRING
    },
    status : {
        type : Sequelize.STRING,
        defaultValue : 'Menunggu Konfirmasi'
    }
});

Pesanan_Pelanggan_Header.hasMany(Pesanan_Pelanggan_Booking_Service,{as : 'Pesanan_Pelanggan_Booking_Service',foreignKey : 'id_pesanan_pelanggan'});
Pesanan_Pelanggan_Header.hasMany(Pesanan_Pelanggan_Detail,{as : 'Pesanan_Pelanggan_Detail',foreignKey : 'id_pesanan_pelanggan'});
Pesanan_Pelanggan_Header.hasOne(Pesanan_Pelanggan_Pengantaran,{as : 'Pesanan_Pelanggan_Pengantaran',foreignKey : 'id_pesanan_pelanggan'});

Pesanan_Pelanggan_Booking_Service.belongsTo(Pesanan_Pelanggan_Header,{as : 'Pesanan_Pelanggan_Header',foreignKey : 'id_pesanan_pelanggan'});
Pesanan_Pelanggan_Detail.belongsTo(Pesanan_Pelanggan_Header,{as : 'Pesanan_Pelanggan_Header',foreignKey : 'id_pesanan_pelanggan'});
Pesanan_Pelanggan_Pengantaran.belongsTo(Pesanan_Pelanggan_Header,{as : 'Pesanan_Pelanggan_Header',foreignKey : 'id_pesanan_pelanggan'});

// Penjualan
Pesanan_Pelanggan_Header.hasOne(Penjualan_Header,{as : 'Penjualan_Header', foreignKey : 'id_pesanan_pelanggan'});
Penjualan_Header.belongsTo(Pesanan_Pelanggan_Header,{as : 'Pesanan_Pelanggan_Header', foreignKey : 'id_pesanan_pelanggan'});

module.exports = Pesanan_Pelanggan_Header
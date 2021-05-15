const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Keranjang_Service = require('../Keranjang/keranjang_service');
const Penjualan_Service = require('../Penjualan/penjualan_service');
const Pesanan_Pelanggan_Booking_Service = require('../Pesanan_Pelanggan/pesanan_pelanggan_booking_service');

const Jenis_Service = db.sequelize.define('jenis_service',{
    id_service: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nama : {
        type : Sequelize.STRING
    },
    harga : {
        type : Sequelize.INTEGER
    },
    aktif : {
        type : Sequelize.TINYINT,
        defaultValue : 1
    }
});

// Keranjang
Jenis_Service.hasOne(Keranjang_Service,{as : 'Keranjang_Service',foreignKey : 'id_service'});
Keranjang_Service.belongsTo(Jenis_Service,{as : 'Jenis_Service',foreignKey : 'id_service'});

// Pesanan pelanggan header
Jenis_Service.hasMany(Pesanan_Pelanggan_Booking_Service,{as : 'Pesanan_Pelanggan_Booking_Service', foreignKey : 'id_service'});
Pesanan_Pelanggan_Booking_Service.belongsTo(Jenis_Service,{as : 'Jenis_Service', foreignKey : 'id_service'});

// Penjualan service
Jenis_Service.hasMany(Penjualan_Service,{as : 'Penjualan_Service', foreignKey : 'id_service'});
Penjualan_Service.belongsTo(Jenis_Service,{as : 'Jenis_Service', foreignKey : 'id_service'});

module.exports = Jenis_Service
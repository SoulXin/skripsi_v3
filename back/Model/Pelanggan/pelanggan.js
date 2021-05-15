const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Penjualan_Header = require('../Penjualan/penjualan_header');
const Pesanan_Pelanggan_Header = require('../Pesanan_Pelanggan/pesanan_pelanggan_header');
const Retur_Penjualan_Header = require('../Retur_Penjualan/retur_penjualan_header');

const Pelanggan = db.sequelize.define('pelanggan',{
    id_pelanggan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : Sequelize.INTEGER
    },
    nama_pelanggan : {
        type : Sequelize.STRING
    },
    foto : {
        type : Sequelize.STRING
    },
    tempat_lahir : {
        type : Sequelize.STRING
    },
    tanggal_lahir : {
        type : Sequelize.DATE
    },
    nomor_telepon_pelanggan : {
        type : Sequelize.INTEGER
    },
    alamat_pelanggan : {
        type : Sequelize.STRING
    },
    kecamatan : {
        type : Sequelize.STRING
    },
    kelurahan : {
        type : Sequelize.STRING
    },
    kode_pos : {
        type : Sequelize.STRING
    },
    email_pelanggan : {
        type : Sequelize.STRING
    }
});

// Pesanan pelanggan
Pelanggan.hasOne(Pesanan_Pelanggan_Header,{as : 'Pesanan_Pelanggan_Header', foreignKey : 'id_pelanggan'});
Pesanan_Pelanggan_Header.belongsTo(Pelanggan,{as : 'Pelanggan', foreignKey : 'id_pelanggan'});

// Penjualan header
Pelanggan.hasOne(Penjualan_Header,{as : 'Penjualan_Header', foreignKey : 'id_pelanggan'});
Penjualan_Header.belongsTo(Pelanggan,{as : 'Pelanggan', foreignKey : 'id_pelanggan'});

// Retur pembelian
Pelanggan.hasOne(Retur_Penjualan_Header,{as : 'Retur_Penjualan_Header', foreignKey : 'id_pelanggan'});
Retur_Penjualan_Header.belongsTo(Pelanggan,{as : 'Pelanggan', foreignKey : 'id_pelanggan'});

module.exports = Pelanggan
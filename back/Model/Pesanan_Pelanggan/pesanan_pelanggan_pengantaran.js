const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Pesanan_Pelanggan_Pengantaran = db.sequelize.define('pesanan_pelanggan_pengantaran',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pesanan_pelanggan : {
        type : Sequelize.INTEGER,
    },
    id_daerah_pengantaran : {
        type : Sequelize.INTEGER
    },
    kurir : {
        type : Sequelize.STRING
    },
    resi : {
        type : Sequelize.STRING
    },
    status_pengantaran_toko : {
        type : Sequelize.TINYINT,
        defaultValue : 0
    },
    status_pengantaran_pelanggan : {
        type : Sequelize.TINYINT,
        defaultValue : 0
    }
});

module.exports = Pesanan_Pelanggan_Pengantaran
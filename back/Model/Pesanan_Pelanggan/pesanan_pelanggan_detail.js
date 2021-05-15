const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Pesanan_Pelanggan_Detail = db.sequelize.define('pesanan_pelanggan_detail',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pesanan_pelanggan : {
        type : Sequelize.INTEGER,
    },
    id_barang : {
        type : Sequelize.INTEGER
    },
    harga_jual : {
        type : Sequelize.INTEGER
    },
    jumlah : {
        type : Sequelize.INTEGER
    },
    total : {
        type : Sequelize.INTEGER
    }
});

module.exports = Pesanan_Pelanggan_Detail
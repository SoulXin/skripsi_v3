const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Pesanan_Pembelian_Detail = db.sequelize.define('pesanan_pembelian_detail',{
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pesanan_pembelian: {
        type : Sequelize.INTEGER,
    },
    id_barang : {
        type : Sequelize.INTEGER
    },
    harga_beli  : {
        type : Sequelize.INTEGER
    },
    jumlah: {
        type : Sequelize.INTEGER
    },
    total: {
        type : Sequelize.INTEGER
    }
});

module.exports = Pesanan_Pembelian_Detail
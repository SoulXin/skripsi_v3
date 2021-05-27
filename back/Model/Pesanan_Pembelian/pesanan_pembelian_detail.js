const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Pesanan_Pembelian_Detail = db.sequelize.define('pesanan_pembelian_detail',{
    id_pesanan_pembelian: {
        type : Sequelize.INTEGER,
        primaryKey : true
    },
    id_barang : {
        type : Sequelize.STRING
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
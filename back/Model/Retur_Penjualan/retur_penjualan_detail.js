const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Retur_Penjualan_Detail = db.sequelize.define('retur_penjualan_detail',{
    id_retur_penjualan  : {
        type : Sequelize.INTEGER,
        unique: true
    },
    id_penjualan  : {
        type : Sequelize.INTEGER
    },
    id_barang : {
        type : Sequelize.STRING,
    },
    max : {
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

module.exports = Retur_Penjualan_Detail
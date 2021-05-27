const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Retur_Pembelian_Detail = db.sequelize.define('retur_pembelian_detail',{
    id_retur_pembelian : {
        primaryKey : true,
        type : Sequelize.INTEGER
    },
    id_pembelian : {
        type : Sequelize.INTEGER
    },
    id_barang : {
        type : Sequelize.STRING
    },
    max : {
        type : Sequelize.INTEGER
    },
    harga_beli : {
        type : Sequelize.INTEGER
    },
    jumlah : {
        type : Sequelize.INTEGER
    },
    total : {
        type : Sequelize.INTEGER
    }
});

module.exports = Retur_Pembelian_Detail
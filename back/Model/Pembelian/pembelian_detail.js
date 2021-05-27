const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Pembelian_Header = require('./pembelian_header');

const Pembelian_Detail = db.sequelize.define('pembelian_detail',{
    id_pembelian : {
        type : Sequelize.INTEGER,
        primaryKey : true,
    },
    id_barang : {
        type : Sequelize.STRING
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

module.exports = Pembelian_Detail
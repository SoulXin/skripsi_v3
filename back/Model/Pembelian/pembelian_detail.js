const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Pembelian_Header = require('./pembelian_header');

const Pembelian_Detail = db.sequelize.define('pembelian_detail',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pembelian : {
        type : Sequelize.INTEGER,
    },
    id_barang : {
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

module.exports = Pembelian_Detail
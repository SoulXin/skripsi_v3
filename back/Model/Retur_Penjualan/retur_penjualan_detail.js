const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Retur_Penjualan_Detail = db.sequelize.define('retur_penjualan_detail',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_retur_penjualan  : {
        type : Sequelize.INTEGER
    },
    id_penjualan  : {
        type : Sequelize.INTEGER
    },
    id_barang : {
        type : Sequelize.INTEGER,
        defaultValue: true
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
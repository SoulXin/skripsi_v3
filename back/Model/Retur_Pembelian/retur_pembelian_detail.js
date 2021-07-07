const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Retur_Pembelian_Detail = db.sequelize.define('retur_pembelian_detail',{
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_retur_pembelian : {
        type : Sequelize.INTEGER,
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
    jumlah : {
        type : Sequelize.INTEGER
    },
    total : {
        type : Sequelize.INTEGER
    }
});

// Retur pembelian detail 


module.exports = Retur_Pembelian_Detail
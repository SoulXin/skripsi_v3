const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Penjualan_Service = db.sequelize.define('penjualan_pelanggan',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
    },
    id_penjualan : {
        type : Sequelize.INTEGER,
    },
    nama_pelanggan : {
        type : Sequelize.STRING
    },
    nomor_polisi: {
        type : Sequelize.STRING
    }
});

module.exports = Penjualan_Service
const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Retur_Penjualan_Detail = require('../Retur_Penjualan/retur_penjualan_detail');

const Penjualan_Pelanggan = db.sequelize.define('penjualan_pelanggan',{
    id_penjualan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
    },
    nama_pelanggan : {
        type : Sequelize.STRING
    },
    nomor_polisi: {
        type : Sequelize.STRING
    },
    no_antrian: {
        type : Sequelize.INTEGER
    }
});

Penjualan_Pelanggan.hasOne(Retur_Penjualan_Detail,{as : 'Retur_Penjualan_Detail', foreignKey : 'id_penjualan'});
Retur_Penjualan_Detail.belongsTo(Penjualan_Pelanggan,{as : 'Penjualan_Pelanggan', foreignKey : 'id_penjualan'});


module.exports = Penjualan_Pelanggan
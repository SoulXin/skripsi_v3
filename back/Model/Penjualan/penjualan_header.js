const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Penjualan_Detail = require('./penjualan_detail');
const Penjualan_Service = require('./penjualan_service');
const Retur_Penjualan_Detail = require('../Retur_Penjualan/retur_penjualan_detail');

const Penjualan_Header = db.sequelize.define('penjualan_header',{
    id_penjualan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nama_pelanggan : {
        type : Sequelize.STRING
    },
    nomor_polisi : {
        type : Sequelize.STRING
    },
    nomor_antrian : {
        type : Sequelize.INTEGER
    },
    tanggal_penjualan : {
        type : Sequelize.DATE
    },
    grand_total: {
        type : Sequelize.INTEGER
    },
    status: {
        type : Sequelize.STRING,
        defaultValue : 'Proses'
    }
});

// Penjualan Detail
Penjualan_Header.hasMany(Penjualan_Detail,{as : 'Penjualan_Detail', foreignKey : 'id_penjualan'});
Penjualan_Detail.belongsTo(Penjualan_Header,{as : 'Penjualan_Header', foreignKey : 'id_penjualan'});

// Penjualan service
Penjualan_Header.hasMany(Penjualan_Service,{as : 'Penjualan_Service', foreignKey : 'id_penjualan'});
Penjualan_Service.belongsTo(Penjualan_Header,{as : 'Penjualan_Header', foreignKey : 'id_penjualan'});

// Retur Penjualan
Penjualan_Header.hasOne(Retur_Penjualan_Detail,{as : 'Retur_Penjualan_Detail', foreignKey : 'id_penjualan'});
Retur_Penjualan_Detail.belongsTo(Penjualan_Header,{as : 'Penjualan_Header', foreignKey : 'id_penjualan'});

module.exports = Penjualan_Header
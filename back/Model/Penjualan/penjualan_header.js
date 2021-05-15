const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Penjualan_Detail = require('./penjualan_detail');
const Penjualan_Service = require('./penjualan_service');

const Penjualan_Header = db.sequelize.define('penjualan_header',{
    id_penjualan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pesanan_pelanggan : {
        type : Sequelize.INTEGER
    },
    tanggal_penjualan : {
        type : Sequelize.DATE
    },
    id_pelanggan: {
        type : Sequelize.INTEGER
    },
    id_mekanik : {
        type : Sequelize.INTEGER
    },
    nopol: {
        type : Sequelize.STRING
    },
    grand_total: {
        type : Sequelize.INTEGER
    },
    status: {
        type : Sequelize.STRING,
        defaultValue : 'Pembuatan'
    }
});

// Penjualan Detail
Penjualan_Header.hasMany(Penjualan_Detail,{as : 'Penjualan_Detail', foreignKey : 'id_penjualan'});
Penjualan_Detail.belongsTo(Penjualan_Header,{as : 'Penjualan_Header', foreignKey : 'id_penjualan'});

// Penjualan service
Penjualan_Header.hasOne(Penjualan_Service,{as : 'Penjualan_Service', foreignKey : 'id_penjualan'});
Penjualan_Service.belongsTo(Penjualan_Header,{as : 'Penjualan_Header', foreignKey : 'id_penjualan'});

// Penjualan_Header.hasOne(Mekanik_Detail, {as : 'Mekanik_Detail', foreignKey : 'id_penjualan'});
// Mekanik_Detail.belongsTo(Penjualan_Header, {as : 'Penjualan_Header', foreignKey : 'id_penjualan'});

module.exports = Penjualan_Header
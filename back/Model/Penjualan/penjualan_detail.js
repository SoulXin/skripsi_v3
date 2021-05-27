const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Penjualan_Service = require('./penjualan_service');

const Penjualan_Detail = db.sequelize.define('penjualan_detail',{
    id_penjualan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
    },
    id_barang : {
        type : Sequelize.STRING
    },
    harga_jual: {
        type : Sequelize.INTEGER
    },
    jumlah : {
        type : Sequelize.INTEGER
    },
    total : {
        type : Sequelize.INTEGER
    }
});

// Penjualan Detail
Penjualan_Detail.hasOne(Penjualan_Service,{as : 'Penjualan_Service', foreignKey : 'id_penjualan'});
Penjualan_Service.belongsTo(Penjualan_Detail,{as : 'Penjualan_Detail', foreignKey : 'id_penjualan'});

module.exports = Penjualan_Detail
const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Retur_Penjualan_Detail = require('./retur_penjualan_detail');

const Retur_Penjualan_Header = db.sequelize.define('retur_penjualan_header',{
    id_retur_penjualan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    tanggal_retur : {
        type : Sequelize.DATE
    },
    alasan_retur : {
        type : Sequelize.STRING
    },
    jenis_penggembalian : {
        type : Sequelize.STRING
    },
    grand_total: {
        type : Sequelize.INTEGER
    },
});

// Retur pembelian detail 
Retur_Penjualan_Header.hasMany(Retur_Penjualan_Detail,{as : 'Retur_Penjualan_Detail', foreignKey : 'id_retur_penjualan'});
Retur_Penjualan_Detail.belongsTo(Retur_Penjualan_Header,{as : 'Retur_Penjualan_Header', foreignKey : 'id_retur_penjualan'});


module.exports = Retur_Penjualan_Header
const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Pembayaran_Hutang_Detail = require('../Pembayaran_Hutang/pembayaran_hutang_detail');
const Retur_Pembelian_Detail = require('../Retur_Pembelian/retur_pembelian_detail');
const Pembelian_Detail = require('./pembelian_detail');

const Pembelian_Header = db.sequelize.define('pembelian_header',{
    id_pembelian : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pesanan_pembelian : {
        type : Sequelize.INTEGER,
        allowNull: true
    },
    tanggal_pembelian : {
        type : Sequelize.DATE
    },
    metode_pembayaran : {
        type : Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    tanggal_jatuh_tempo : {
        type : Sequelize.DATE
    },
    id_supplier  : {
        type : Sequelize.STRING,
        allowNull: true
    },
    grand_total: {
        type : Sequelize.INTEGER
    },
    pembayaran : { 
        type : Sequelize.BOOLEAN,
        defaultValue: false
    },
    status : {
        type : Sequelize.STRING,
        defaultValue : 'Pembuatan'
    }
});

// pembelian detail
Pembelian_Header.hasMany(Pembelian_Detail,{as : 'Pembelian_Detail', foreignKey : 'id_pembelian'});
Pembelian_Detail.belongsTo(Pembelian_Header,{as : 'Pembelian_Header', foreignKey : 'id_pembelian'});

// hutang detail
Pembelian_Header.hasOne(Pembayaran_Hutang_Detail,{as : 'Pembayaran_Hutang_Detail', foreignKey : 'id_pembelian'});
Pembayaran_Hutang_Detail.belongsTo(Pembelian_Header,{as : 'Pembelian_Header', foreignKey : 'id_pembelian'});

// hutang detail
Pembelian_Header.hasOne(Retur_Pembelian_Detail,{as : 'Retur_Pembelian_Detail', foreignKey : 'id_pembelian'});
Retur_Pembelian_Detail.belongsTo(Pembelian_Header,{as : 'Pembelian_Header', foreignKey : 'id_pembelian'});

module.exports = Pembelian_Header
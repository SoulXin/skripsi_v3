const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Pesanan_Pembelian_Detail = require('./pesanan_pembelian_detail');

const Pesanan_Pembelian_Header = db.sequelize.define('pesanan_pembelian_header',{
    id_pesanan_pembelian: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    tanggal_pemesanan : {
        type : Sequelize.DATE
    },
    id_supplier  : {
        type : Sequelize.INTEGER
    },
    grand_total: {
        type : Sequelize.INTEGER
    },
    status : {
        type : Sequelize.STRING,
        defaultValue : 'Pembuatan'
    }
});

Pesanan_Pembelian_Header.hasMany(Pesanan_Pembelian_Detail,{as : 'Pesanan_Pembelian_Detail',foreignKey : 'id_pesanan_pembelian'});
Pesanan_Pembelian_Detail.belongsTo(Pesanan_Pembelian_Header,{as : 'Pesanan_Pembelian_Header',foreignKey : 'id_pesanan_pembelian'});

module.exports = Pesanan_Pembelian_Header
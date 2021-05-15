const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Pembelian_Header = require('../Pembelian/pembelian_header');
const Pesanan_Pembelian_Header = require('../Pesanan_Pembelian/pesanan_pembelian_header');
const Retur_Pembelian_Header = require('../Retur_Pembelian/retur_pembelian_header');

const Supplier = db.sequelize.define('supplier',{
    id_supplier: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nama_supplier : {
        type : Sequelize.STRING
    },
    nomor_telepon_supplier : {
        type : Sequelize.INTEGER
    },
    email_supplier : {
        type : Sequelize.STRING
    },
    alamat_supplier : {
        type : Sequelize.STRING
    },
    bank_supplier : {
        type : Sequelize.STRING
    },
    no_rek_supplier : {
        type : Sequelize.INTEGER
    },
    keterangan : {
        type : Sequelize.STRING
    },
    aktif : {
        type : Sequelize.TINYINT,
        defaultValue : 1
    }
});

// Pesanan pembelian
Supplier.hasOne(Pesanan_Pembelian_Header,{as : 'Pesanan_Pembelian_Header', foreignKey : 'id_supplier'});
Pesanan_Pembelian_Header.belongsTo(Supplier,{as : 'Supplier', foreignKey : 'id_supplier'});

// Pesanan pembelian
Supplier.hasOne(Pembelian_Header,{as : 'Pembelian_Header', foreignKey : 'id_supplier'});
Pembelian_Header.belongsTo(Supplier,{as : 'Supplier', foreignKey : 'id_supplier'});

// Retur pembelian
Supplier.hasOne(Retur_Pembelian_Header,{as : 'Retur_Pembelian_Header', foreignKey : 'id_supplier'});
Retur_Pembelian_Header.belongsTo(Supplier,{as : 'Supplier', foreignKey : 'id_supplier'});

module.exports = Supplier
const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Retur_Pembelian_Detail = require('./retur_pembelian_detail');

const Retur_Pembelian_Header = db.sequelize.define('retur_pembelian_header',{
    id_retur_pembelian : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    tanggal_retur : {
        type : Sequelize.DATE
    },
    id_supplier  : {
        type : Sequelize.STRING,
        allowNull: true
    },
    jenis_penggembalian : {
        type : Sequelize.STRING
    },
    grand_total: {
        type : Sequelize.INTEGER
    },
    alasan_retur : {
        type : Sequelize.STRING
    }
});

// Retur pembelian detail 
Retur_Pembelian_Header.hasMany(Retur_Pembelian_Detail,{as : 'Retur_Pembelian_Detail', foreignKey : 'id_retur_pembelian'});
Retur_Pembelian_Detail.belongsTo(Retur_Pembelian_Header,{as : 'Retur_Pembelian_Header', foreignKey : 'id_retur_pembelian'});


module.exports = Retur_Pembelian_Header
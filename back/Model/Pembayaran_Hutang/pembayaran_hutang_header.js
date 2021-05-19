const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Pembayaran_Hutang_Detail = require('./pembayaran_hutang_detail');

const Pembayaran_Hutang_Header = db.sequelize.define('pembayaran_hutang_header',{
    id_pembayaran : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    tanggal_pembayaran : {
        type : Sequelize.DATE
    },
    id_supplier  : {
        type : Sequelize.INTEGER,
        allowNull: true
    },
    jenis_pembayaran : {
        type : Sequelize.BOOLEAN,
        defaultValue: false
    },
    status_pembayaran : {
        type : Sequelize.BOOLEAN,
        defaultValue: false
    },
    total : {
        type : Sequelize.INTEGER
    }
});

// Penjualan service
Pembayaran_Hutang_Header.hasMany(Pembayaran_Hutang_Detail,{as : 'Pembayaran_Hutang_Detail', foreignKey : 'id_pembayaran'});
Pembayaran_Hutang_Detail.belongsTo(Pembayaran_Hutang_Header,{as : 'Pembayaran_Hutang_Header', foreignKey : 'id_pembayaran'});

module.exports = Pembayaran_Hutang_Header
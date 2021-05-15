const Sequelize = require('sequelize');
const db = require ('../Database/db');

const Pembayaran_Hutang_Detail = db.sequelize.define('pembayaran_hutang_detail',{
    id_pembayaran : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pembelian : {
        type : Sequelize.INTEGER
    },
    tanggal_pembelian : {
        type : Sequelize.DATE
    },
    tanggal_jatuh_tempo : {
        type : Sequelize.DATE
    },
    jumlah : {
        type : Sequelize.INTEGER
    },
    keterangan: {
        type : Sequelize.STRING
    }
});

module.exports = Pembayaran_Hutang_Detail
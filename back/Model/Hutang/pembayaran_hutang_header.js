const Sequelize = require('sequelize');
const db = require ('../Database/db');

const Pembayaran_Hutang_Header = db.sequelize.define('pembayaran_hutang_header',{
    id_pembayaran : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    tanggal_pembayaran : {
        type : Sequelize.DATE
    },
    metode_pembayaran : {
        type : Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    id_supplier  : {
        type : Sequelize.STRING
    },
    total: {
        type : Sequelize.INTEGER
    }
});

module.exports = Pembayaran_Hutang_Header
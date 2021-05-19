const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Penjualan_Service = db.sequelize.define('penjualan_service',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
    },
    id_penjualan : {
        type : Sequelize.INTEGER,
    },
    id_service : {
        type : Sequelize.INTEGER
    },
    harga : {
        type : Sequelize.INTEGER
    },
    no_antrian: {
        type : Sequelize.INTEGER
    }
});

module.exports = Penjualan_Service
const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Penjualan_Service = db.sequelize.define('penjualan_service',{
    id_penjualan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
    },
    id_service : {
        type : Sequelize.STRING
    },
    harga : {
        type : Sequelize.INTEGER
    },
    no_antrian: {
        type : Sequelize.INTEGER
    }
});

module.exports = Penjualan_Service
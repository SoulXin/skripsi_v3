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
    id_mekanik : {
        type : Sequelize.STRING
    }
});

module.exports = Penjualan_Service
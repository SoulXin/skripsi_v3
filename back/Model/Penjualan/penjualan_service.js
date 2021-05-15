const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Penjualan_Service = db.sequelize.define('penjualan_service',{
    id_penjualan : {
        type : Sequelize.INTEGER,
    },
    id_service : {
        type : Sequelize.INTEGER
    },
    waktu: {
        type : Sequelize.STRING
    },
    no_antrian: {
        type : Sequelize.INTEGER
    }
});

module.exports = Penjualan_Service
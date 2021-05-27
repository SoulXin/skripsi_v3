const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Mekanik_Detail = db.sequelize.define('mekanik_detail',{
    id_mekanik : {
        type : Sequelize.STRING,
        primaryKey : true
    },
    id_penjualan : {
        type : Sequelize.INTEGER
    },
    id_service : {
        type : Sequelize.INTEGER
    },
    tanggal : {
        type : Sequelize.DATE
    }
});


module.exports = Mekanik_Detail
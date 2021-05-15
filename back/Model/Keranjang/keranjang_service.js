const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Keranjang_Service = db.sequelize.define('keranjang_service_pelanggan',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pelanggan : {
        type : Sequelize.INTEGER
    },
    id_service : {
        type : Sequelize.INTEGER
    }
});

module.exports = Keranjang_Service
const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Pesanan_Pelanggan_Booking_Service = db.sequelize.define('pesanan_pelanggan_booking_service',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pesanan_pelanggan : {
        type : Sequelize.INTEGER,
    },
    id_service : {
        type : Sequelize.INTEGER
    },
    waktu : {
        type : Sequelize.STRING
    },
    no_antrian : {
        type : Sequelize.INTEGER
    }
});

module.exports = Pesanan_Pelanggan_Booking_Service
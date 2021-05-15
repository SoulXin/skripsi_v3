const Sequelize = require('sequelize');
const db = require ('../../Database/db');


const Keranjang_Barang = db.sequelize.define('keranjang_barang_pelanggan',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_pelanggan : {
        type : Sequelize.INTEGER
    },
    id_barang : {
        type : Sequelize.INTEGER
    },
    jumlah : {
        type : Sequelize.INTEGER
    }
});

module.exports = Keranjang_Barang
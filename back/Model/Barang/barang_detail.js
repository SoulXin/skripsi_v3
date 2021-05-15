const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Barang_Detail = db.sequelize.define('barang_detail',{
    id_barang : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_kategori : {
        type : Sequelize.INTEGER
    },
    stok_minimal : {
        type : Sequelize.INTEGER
    },
    stok : {
        type : Sequelize.INTEGER
    }
});

module.exports = Barang_Detail
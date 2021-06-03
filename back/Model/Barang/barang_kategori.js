const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Barang_Kategori = db.sequelize.define('barang_kategori',{
    id_barang : {
        type : Sequelize.STRING,
        primaryKey : true
    },
    id_kategori : {
        type : Sequelize.STRING
    }
});

module.exports = Barang_Kategori
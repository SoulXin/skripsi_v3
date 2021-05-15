const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Barang_Detail = require('../Barang/barang_detail');

const Kategori = db.sequelize.define('kategori',{
    id_kategori : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nama_kategori : {
        type : Sequelize.STRING
    },
    aktif : {
        type : Sequelize.TINYINT,
        defaultValue : 1
    }
});

module.exports = Kategori
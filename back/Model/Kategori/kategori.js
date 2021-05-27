const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Kategori = db.sequelize.define('kategori',{
    id_kategori : {
        type : Sequelize.STRING,
        primaryKey : true
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
const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Barang_Detail = db.sequelize.define('barang_detail',{
    id_barang : {
        type : Sequelize.STRING,
        primaryKey : true
    },
    id_kategori : {
        type : Sequelize.STRING
    },
    stok_minimal : {
        type : Sequelize.INTEGER
    },
    stok : {
        type : Sequelize.INTEGER
    }
});

module.exports = Barang_Detail
const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Penjualan_Header = require('../Penjualan/penjualan_header');

const Mekanik_Header = db.sequelize.define('mekanik_header',{
    id_mekanik : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nama : {
        type : Sequelize.STRING
    },
    no_telp : {
        type : Sequelize.INTEGER
    },
    alamat : {
        type : Sequelize.STRING
    },
    gambar : {
        type : Sequelize.STRING
    },
    aktif : {
        type : Sequelize.TINYINT,
        defaultValue : 1
    }
});

Mekanik_Header.hasOne(Penjualan_Header, {as : 'Penjualan_Header', foreignKey : 'id_mekanik'});
Penjualan_Header.belongsTo(Mekanik_Header, {as : 'Mekanik_Header', foreignKey : 'id_mekanik'});


module.exports = Mekanik_Header
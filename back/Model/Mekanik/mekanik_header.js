const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Penjualan_Service = require('../Penjualan/penjualan_service');

const Mekanik_Header = db.sequelize.define('mekanik',{
    id_mekanik : {
        type : Sequelize.STRING,
        primaryKey : true
    },
    nama_mekanik : {
        type : Sequelize.STRING
    },
    no_telp : {
        type : Sequelize.STRING
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


// Penjualan service
Mekanik_Header.hasOne(Penjualan_Service,{as : 'Penjualan_Service', foreignKey : 'id_mekanik'});
Penjualan_Service.belongsTo(Mekanik_Header,{as : 'Mekanik_Header', foreignKey : 'id_mekanik'});

module.exports = Mekanik_Header
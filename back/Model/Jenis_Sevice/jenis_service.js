const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Mekanik_Detail = require('../Mekanik/mekanik_detail');
const Penjualan_Service = require('../Penjualan/penjualan_service');

const Jenis_Service = db.sequelize.define('jenis_service',{
    id_service: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nama : {
        type : Sequelize.STRING
    },
    harga : {
        type : Sequelize.INTEGER
    },
    aktif : {
        type : Sequelize.TINYINT,
        defaultValue : 1
    }
});

// Penjualan service
Jenis_Service.hasMany(Penjualan_Service,{as : 'Penjualan_Service', foreignKey : 'id_service'});
Penjualan_Service.belongsTo(Jenis_Service,{as : 'Jenis_Service', foreignKey : 'id_service'});

// Mekanik
Jenis_Service.hasMany(Mekanik_Detail,{as : 'Mekanik_Detail', foreignKey : 'id_service'});
Mekanik_Detail.belongsTo(Jenis_Service,{as : 'Jenis_Service', foreignKey : 'id_service'});

module.exports = Jenis_Service
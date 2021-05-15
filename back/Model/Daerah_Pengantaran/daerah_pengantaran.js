const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Pesanan_Pelanggan_Pengantaran = require('../Pesanan_Pelanggan/pesanan_pelanggan_pengantaran');

const Daerah_Pengantaran = db.sequelize.define('daerah_pengantaran',{
    id_daerah_pengantaran : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    kecamatan : {
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

Daerah_Pengantaran.hasOne(Pesanan_Pelanggan_Pengantaran,{as : 'Pesanan_Pelanggan_Pengantaran',foreignKey : 'id_daerah_pengantaran'});
Pesanan_Pelanggan_Pengantaran.belongsTo(Daerah_Pengantaran,{as : 'Daerah_Pengantaran',foreignKey : 'id_daerah_pengantaran'});


module.exports = Daerah_Pengantaran
const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Penomoran = db.sequelize.define('penomoran',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true
    },
    nama_module : {
        type : Sequelize.STRING
    },
    nomor_terakhir : {
        type : Sequelize.INTEGER
    },
    format : {
        type : Sequelize.STRING
    }
});


module.exports = Penomoran
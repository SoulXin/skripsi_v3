const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Mekanik_Detail = require('./mekanik_detail');

const Mekanik_Header = db.sequelize.define('mekanik_header',{
    id_mekanik : {
        type : Sequelize.STRING,
        primaryKey : true
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


Mekanik_Header.hasOne(Mekanik_Header,{as : 'Mekanik_Detail', foreignKey : 'id_mekanik'});
Mekanik_Detail.belongsTo(Mekanik_Header,{as : 'Mekanik_Header', foreignKey : 'id_mekanik'});

module.exports = Mekanik_Header
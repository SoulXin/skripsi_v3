const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Mekanik_Header = require('./mekanik_header');

const Mekanik_Detail = db.sequelize.define('mekanik_detail',{
    id_mekanik : {
        type : Sequelize.INTEGER
    },
    id_penjualan : {
        type : Sequelize.INTEGER
    },
    id_service : {
        type : Sequelize.INTEGER
    },
    tanggal : {
        type : Sequelize.DATE
    }
});

Mekanik_Header.hasOne(Mekanik_Detail, {as : 'Mekanik_Detail', foreignKey : 'id_mekanik'});
Mekanik_Detail.belongsTo(Mekanik_Header, {as : 'Mekanik_Header', foreignKey : 'id_mekanik'});

module.exports = Mekanik_Detail
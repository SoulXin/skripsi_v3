const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Hak_Akses_User = require('../Hak_Akses_User/hak_akses_user');

const Hak_Akses = db.sequelize.define('hak_akses',{
    hak_akses_id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    akses : {
        type : Sequelize.STRING,
    }
});
// Retur penjualan detail 
Hak_Akses.hasOne(Hak_Akses_User,{as : 'Hak_Akses_User', foreignKey : 'hak_akses_id'});
Hak_Akses_User.belongsTo(Hak_Akses,{as : 'Hak_Akses', foreignKey : 'hak_akses_id'});

module.exports = Hak_Akses
const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Hak_Akses_User = db.sequelize.define('hak_akses_user',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : Sequelize.INTEGER
    },
    hak_akses_id : {
        type : Sequelize.INTEGER
    },
    lihat : {
        type : Sequelize.BOOLEAN,
        defaultValue: true
    },
    ubah : {
        type : Sequelize.BOOLEAN,
        defaultValue: true
    },
    hapus : {
        type : Sequelize.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Hak_Akses_User
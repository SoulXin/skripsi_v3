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
        defaultValue: false
    },
    ubah : {
        type : Sequelize.BOOLEAN,
        defaultValue: false
    },
    hapus : {
        type : Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Hak_Akses_User
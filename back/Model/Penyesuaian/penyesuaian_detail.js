const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const Penyesuaian_Detail = db.sequelize.define('penyesuaian_detail',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_penyesuaian : {
        type : Sequelize.INTEGER
    },
    id_barang : {
        type : Sequelize.INTEGER
    },
    jumlah_fisik: {
        type : Sequelize.INTEGER
    },
    jumlah_sistem : {
        type : Sequelize.INTEGER
    },
    penyesuaian : {
        type : Sequelize.INTEGER
    }
});

module.exports = Penyesuaian_Detail
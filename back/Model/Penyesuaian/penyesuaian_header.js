const Sequelize = require('sequelize');
const db = require ('../../Database/db');
const Penyesuaian_Detail = require('./penyesuaian_detail');

const Penyesuaian_Header = db.sequelize.define('penyesuaian_header',{
    id_penyesuaian: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    tanggal_penyesuaian: {
        type : Sequelize.DATE
    }
});

// Penyesuaian 
Penyesuaian_Header.hasMany(Penyesuaian_Detail,{as : 'Penyesuaian_Detail', foreignKey : 'id_penyesuaian'});
Penyesuaian_Detail.belongsTo(Penyesuaian_Header,{as : 'Penyesuaian_Header', foreignKey : 'id_penyesuaian'});

module.exports = Penyesuaian_Header
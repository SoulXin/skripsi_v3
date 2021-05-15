const Sequelize = require('sequelize');
const db = require ('../../Database/db');

const User = db.sequelize.define('user',{
    user_id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type : Sequelize.STRING
    },
    password : {
        type : Sequelize.STRING
    },
    status : {
        type : Sequelize.TINYINT,
        defaultValue : 0
    }
});

module.exports = User
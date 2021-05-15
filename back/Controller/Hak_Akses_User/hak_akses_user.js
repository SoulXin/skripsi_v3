const Hak_Akses_User = require('../../Model/Hak_Akses_User/hak_akses_user');
const { Op } = require("sequelize");

exports.register = async (req,res) => {
    const {user_id,hak_akses_id,value} = req.body;
    const check = await Hak_Akses_User.findOne({where : {[Op.and] : [{user_id : user_id},{hak_akses_id : hak_akses_id}]}});
    if(!check && value == 1){
        try{
            const result = await Hak_Akses_User.create({
                user_id : user_id,
                hak_akses_id : hak_akses_id
            })
            await res.status(200).json(result);
        }catch(error){
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
            res.status(400).end();
        }
    }else if(check && value == 0){
        try{
            const result = await Hak_Akses_User.destroy({
                where : {
                    [Op.and] : [
                        {user_id : user_id},
                        {hak_akses_id : hak_akses_id}
                    ]
                }
            })
            await res.status(200).json(result);
        }catch(error){
            res.statusMessage = "Terjadi masalah dengan server" + ` ( ${error} )`;
            res.status(400).end();
        }
    }
}

exports.show_detail = (req,res) => {
    const {id} = req.params;
    Hak_Akses_User.findAll({
        where : {
            user_id : id
        }
    })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.statusMessage = "Terjadi masalah dengan server" + ` ( ${err} )`;
        res.status(400).end();
    });
}
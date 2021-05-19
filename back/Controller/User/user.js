const User = require('../../Model/User/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

exports.register = (req,res) => {
    const userData = {
        username : req.body.username,
        password : req.body.password
    }

    User.findOne({
        where : {
            username : req.body.username
        }
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
            })
        }else{
            res.status(400).json({ error: 'Username Sudah Ada ' })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
}

exports.show_all = (req,res) => {
    User.findAll({})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.send('error: ' + err)
    })
}

exports.login = (req,res) => {
    User.findOne({
        where : {
            username : req.body.username
        }
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(user);
            }else{
                res.statusMessage = "Username dan Password Salah";
                res.status(401).end();
            }
        }else{
            res.statusMessage = "Username dan Password Salah";
            res.status(401).end();
        }
    })
    .catch(err => {
        res.statusMessage = "Terdapat Kesalahan Pada Server";
        res.status(500).end();
    })
}

exports.change_password = async (req,res) => {
    try {
        const userData = {
            username : req.body.username,
            password : req.body.password,
        }

        bcrypt.hash(req.body.password,10,(err,hash) => {
            userData.password = hash
            User.update({
                password : userData.password
            },{
                where : {
                    username : userData.username
                }
            })
            .then(user => {
                res.json({ status: 'Password Berhasil Di Ubah' })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        })
    } catch (error) {
        res.status(400).send(error)
    }
}
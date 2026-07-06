const jwt = require('jsonwebtoken')
const User = require('../models/Users')

exports.register = async(req,res) => {
    try{

        const uname = await User.findOne({
            username: req.body.username
        })

        if(uname){
            return res.status(201).json({
                message: "username exists"
            })
        }
        
        const mail = await User.findOne({
            email: req.body.email
        })
        
        if(mail){
            return res.status(201).json({
                message: "email exists"
            })
        }

        const hash = await jwt.hash(req.body.password,10)

        const user = await User.create({
            username: uname,
            name: req.body.name,
            phno: req.body.phno,
            email: mail,
            password: hash,
            role: req.body.role
        })

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: err.message
        })
    }
}
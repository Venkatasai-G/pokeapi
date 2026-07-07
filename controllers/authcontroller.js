const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const bcrypt = require('bcrypt')

exports.register = async(req,res) => {
    try{

        const uname = await User.findOne({
            username: req.body.username
        })

        if(uname){
            return res.status(409).json({
                message: "username exists"
            })
        }
        
        const mail = await User.findOne({
            email: req.body.email
        })
        
        if(mail){
            return res.status(409).json({
                message: "email exists"
            })
        }

        const hash = await bcrypt.hash(req.body.password,10)

        const user = await User.create({
            username: req.body.username,
            name: req.body.name,
            phno: req.body.phno,
            email: req.body.email,
            password: hash,
            role: "user"
        })

        return res.status(201).json({
            message: "User registered successfully",
            data: user
        });

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: err.message
        })
    }
}

exports.login = async(req,res) => {
    try{

        const mail = await User.findOne({
            email: req.body.email
        })

        if(!mail){
            return res.status(404).json({
                message: "mail not found"
            })
        }

        const ismatch = await bcrypt.compare(
            req.body.password,
            mail.password
        )

        if(!ismatch){
            return res.status(401).json({
                message: "password is wrong"
            })
        }

        const token = await jwt.sign(
            { 
                id: mail._id,
                role: mail.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        )

        res.status(200).json({
            message:"login done",
            token
        })

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: err.message
        })
    }
}

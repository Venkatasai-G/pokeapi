const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    phno:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    password:{
        type:String,
        required:true,
        minlength:7
    }
})

module.exports = mongoose.model("User",userSchema);
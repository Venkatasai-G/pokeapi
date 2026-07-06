const mongoose = require('mongoose')
//const seed = require('../scripts/seed')

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        
        console.log("Connected db");
        //await seed();
        //console.log("DB seeded");

    }catch(error){
        console.log(error)
    }
}

module.exports = connectdb
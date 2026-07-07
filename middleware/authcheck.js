const jwt = require('jsonwebtoken')

const auth = async(req,res,next) => {
    try{

        const token = req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            return res.status(404).json({
                message:"login first"
            })
        }

        let decode;

        try{
            decode = jwt.verify(token, process.env.JWT_SECRET)
        }catch(err){
            return res.status(500).json({
                message: "invalid token/ session expired"
            })
        }
        req.user = decode.id

        next()
        

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = auth
const userauth = async(req,res,next) => {
    try{
        const role = req.user.role

        if(role=="user"){
            return res.status(409).json({
                message: "can not have acess"
            })
        }

        next()

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: err.message
        })
    }

}

module.exports = userauth
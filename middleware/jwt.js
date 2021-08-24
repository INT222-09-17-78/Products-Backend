const {sign,verify} = require('jsonwebtoken')

const createTokens = (user) => {
    const accessToken = sign({id:user.id},"testToken")
    return accessToken
}

const validateToken = (req,res,next) => {
    // console.log(req.session.cookie)
    const accessToken = req.cookies["access-token"]
    if(!accessToken){
        return res.status(401).json({message: 'user not authenticated'})
    }

    try{
        const validToken = verify(accessToken, "testToken");
        if(validToken){
            return next()
        }
    }catch(error){
        return res.status(401).json({message: error})
    }
}

module.exports = {createTokens,validateToken}
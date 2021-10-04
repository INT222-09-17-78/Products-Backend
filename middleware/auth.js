const {sign,verify} = require('jsonwebtoken')
const db = require('../models')
const Users = db.users

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
            // console.log(validToken)
            req.token = validToken
            return next()
        }
    }catch(error){
        return res.status(401).json({message: 'invalid token'})
        //"it's not right token maybe plese login first"
    }
}
// const validateLoggedIn = (req, res, next) => {
//     console.log(req.session.username)
//     if (req.session.username) {
//       next()
//     } else {
//       res.status(401).json({
//         message: 'please login first'
//       })
//     }
//   }

const ValidateAdmin = async (req, res, next) => {
  try{
      const user = await Users.findOne({
        where: {
          id: req.token.id,
          role: 'Admin'
        }
        
    })
      if(user == null){
        res.status(401).json({
          message: 'you are not Admin'
        })
      }else{
        next()
      }
    
}catch(error){
    return res.status(401).json({message: error.message})
    //"it's not right token maybe plese login first"
}
  
}

module.exports = {createTokens,validateToken,ValidateAdmin}
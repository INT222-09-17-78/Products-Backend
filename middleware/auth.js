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
            return next()
        }
    }catch(error){
        return res.status(401).json({message: error})
        //"it's not right token maybe plese login first"
    }
}
const validateLoggedIn = (req, res, next) => {
    console.log(req.session.username)
    if (req.session.username) {
      next()
    } else {
      res.status(401).json({
        message: 'please login first'
      })
    }
  }

const ValidateAdmin = (req, res, next) => {
  console.log(req.session.username)
  const user = Users.findOne({
    where: {
      username: req.session.username,
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
}

module.exports = {createTokens,validateToken,validateLoggedIn,ValidateAdmin}
const { sign, verify } = require('jsonwebtoken')
const db = require('../models')
const Users = db.users
require('dotenv').config()

const createTokens = (user) => {
  const accessToken = sign({ id: user.id, isLoggedIn: true ,role:user.role }, process.env.JWT_SECRET)
  return accessToken
}

// const changeIsloggeIn = () => {
//   // const accessToken = req.cookies["access-token"]
//   // if (!accessToken) {
//   //   return res.status(401).json({ message: 'user not authenticated' })
//   // }
//   try {
//     req.token.isLoggedIn = false
//     return res.status(200).json('changeIsLoggedIn success is LoggedIn : '+  req.token.isLoggedIn)
//   } catch (error) {
//     return res.status(401).json({ message: error.message })
//     //"it's not right token maybe plese login first"
//   }
// }

const getIsloggedIn = (req,res) => {
  // const accessToken = req.cookies["access-token"]
  // if (!accessToken) {
  //   return res.status(401).json({ message: 'user not authenticated' })
  // }else{
    return res.status(200).json({isLoggedIn: req.token.isLoggedIn})
  // }
}

const getRole = (req , res) => {
  // const accessToken = req.cookies["access-token"]
  // if (!accessToken) {
  //   return res.status(401).json({ message: 'user not authenticated' })
  // }else{
    Users.findOne({where:{id: req.token.id}}).then(user => {
      if(user==null){
        res.status(401).json({message:'cant find this user id : ' + req.token.id})
      }
      return res.status(200).json({role: user.role})
    }).catch(err=>{
      res.status(500).json({mesage:err.message})
    })
    
  // }
}

const getUserName = (req , res) => {
  // const accessToken = req.cookies["access-token"]
  // if (!accessToken) {
  //   return res.status(401).json({ message: 'user not authenticated' })
  // }else{
    Users.findOne({where:{id: req.token.id}}).then(user => {
      if(user==null){
        res.status(401).json({message:'cant find this user id : ' + req.token.id})
      }
      return res.status(200).json({username: user.username})
    }).catch(err=>{
      res.status(500).json({mesage:err.message})
    })
    
  // }
}

const validateToken = (req, res, next) => {
  // console.log(req.session.cookie)
  const accessToken = req.cookies["access-token"]
  if (!accessToken) {
    return res.status(401).json({ message: 'user not authenticated' })
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      // console.log(validToken)
      req.token = validToken
      return next()
    }
  } catch (error) {
    return res.status(401).json({ message: 'invalid token' })
    //"it's not right token maybe plese login first"
  }
}
const validateTokenPublic = async (req, res, next) => {
  // console.log(req.session.cookie)
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  // const accessToken = req.cookies["access-token"]
  if (!accessToken) {
    return res.status(401).json({ message: 'client not authenticated' })
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET_PUBLIC);
    // const user = await Users.findOne({
    //   _id: validToken.id
    // })
    if (validToken) {
      // req.user = user
      // req.token = validToken
      return next()
    } else {
      return res.status(500).json({ message: "token is not valid or cant find user" })
    }
  } catch (error) {
    return res.status(401).json({ message: error })
    //"it's not right token maybe plese login first"
  }
}
// const validateTokenOffClient = (req, res ,next) => {
//   const accessToken =
// }

// const validateToken = async (req, res, next) => {
//   // console.log(req.session.cookie)
//   const authHeader = req.headers['authorization']
//   const accessToken = authHeader && authHeader.split(' ')[1]
//   // const accessToken = req.cookies["access-token"]
//   if (!accessToken) {
//     return res.status(401).json({ message: 'user not authenticated' })
//   }

//   try {
//     const validToken = verify(accessToken, process.env.JWT_SECRET);
//     const user = await Users.findOne({
//       _id: validToken.id
//     })
//     if (validToken && user) {
//       req.user = user
//       req.token = validToken
//       return next()
//     }else{
//       res.status(500).json({message:"token is not valid or cant find user"})
//     }
//   } catch (error) {
//     return res.status(401).json({ message: error })
//     //"it's not right token maybe plese login first"
//   }
// }
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
  try {
    const user = await Users.findOne({
      where: {
        id: req.token.id,
        role: 'Admin'
      }

    })
    if (user == null) {
      res.status(401).json({
        message: 'you are not Admin'
      })
    } else {
      next()
    }

  } catch (error) {
    return res.status(401).json({ message: error.message })
    //"it's not right token maybe plese login first"
  }

}

module.exports = { createTokens, validateToken, ValidateAdmin, validateTokenPublic  ,getIsloggedIn ,getRole ,getUserName}
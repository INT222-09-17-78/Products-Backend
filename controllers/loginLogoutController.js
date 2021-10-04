const auth = require('../middleware/auth')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models')
const Users = db.users
const bcrypt = require('bcrypt')
exports.loggedInUser = (req, res) => {
    
    if (!req.token) {
      
      // next()
      res.status(401).json({
        loggedIn: false
      })
    } else {
      const id = req.token.id;
        Users.findByPk(id)
          .then(data => {
            // console.log(data.username)
            res.status(200).json({
              loggedIn: true,
              user: data.username
            })
          })
          .catch(err => {
            res.status(500).json({
              message: "Error retrieving Users with id=" + id
            });
          });
     
    }
  }

  exports.logIn = async (req, res) => {
    if (!req.body.username || !req.body.password) {
      console.log('username or password is invalid')
      res.status(400).json({
        message: 'username or password is invalid'
      })
      // res.redirect('/login')
      return;
    }
    const user = await Users.findOne({
      where: {
        [Op.or]: [{
          username: req.body.username
        }, {
          email: req.body.username
        }, {
          mobile: req.body.username
        }]
      }
    })
    if (user == null || await bcrypt.compare(req.body.password, user.password) == false) {
      console.log('incorrect username or password')
      res.status(401).json({
        message: 'Authentication failed. Incorrect username or password'
      })
      return;
    } else {
      const token = auth.createTokens(user)
      res.cookie("access-token", token, {
        maxAge: 1800000,
        httpOnly: true,
      })
      // req.session.username = user.username
      // console.log(req.session)
      console.log('login success')
      res.status(200).json({
        message: 'login success.',
        token: token
      })
      // res.redirect('http://localhost:3000/')
    }
  }



  exports.logOut = (req, res) => {
    try {
      res.clearCookie("access-token")
      res.status(200).json({message: 'logout success'})
    } catch (error) {
      res.status(500).json({message: error.message})
    }
    
        
         
  }
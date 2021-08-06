// const {User} = require('../models/PostModel')
const bcrypt = require('bcrypt')
const db = require('../models')
const Users = db.users
const Op = db.sequelize.Op


// exports.postUser = async (req,res) => {
//     const {username , password: plainTextPassword } = req.body
//     const password = await bcrypt.hash(plainTextPassword,10)
//     try {
//         const res = await User.create({
//             username,
//             password
//         })
//         console.log('create user successfully')
//     } catch (error) {
//         res.json(error)
//     }
// }
exports.create = async (req, res) => {
// Validate request
if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: "username or password can not be empty!"
    });
    console.log({
        message: "username or password can not be empty!"
      })
    return;
  }
    const {username , password: plainTextPassword } = req.body
    const password = await bcrypt.hash(plainTextPassword,10)
   
  // Create a Tutorial
  const users = {
    username: username,
    password: password,
   
  };

  // Save Tutorial in the database
  Users.create(users)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
      console.log({message: err.message || "Some error occurred while creating the Tutorial."})
    });
}
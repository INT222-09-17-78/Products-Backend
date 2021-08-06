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

  
    const {username , password: plainTextPassword } = req.body
    const password = await bcrypt.hash(plainTextPassword,10)

    if (!req.body.username || !plainTextPassword || typeof req.body.username != 'string' || typeof plainTextPassword != 'string') {
      res.status(400).json({
        message: "username or password is empty! or invalid!"
      });
      console.log({
          message: "username or password is empty! or invalid!"
        })
      return;
    }
  if(plainTextPassword <= 5){
    res.status(400).json({
      message: "Password is toosmall. Should be atleast 6 characters"
    })
    return;
  }
   
  // Create a Tutorial
  const users = {
    username: username,
    password: password,
   
  };

  // Save Tutorial in the database
  Users.create(users)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
      console.log({message: err.message || "Some error occurred while creating the Tutorial."})
    });

}

exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Users.findAll({where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.getSession = (request, response) => {
  let sess = request.session
  console.log(sess)
  response.status(200).send('email = ' + sess.email + '  ' + '_id = ' + sess._id)
}


exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


exports.logIn = async (req, res) => {
  const user = await Users.findOne({where: {username : req.body.username}})
  console.log(user)
  if(user == null){
    console.log('user does not exist')
    res.status(401).json({message: 'Authentication failed.'})
    res.redirect('/login')
    return;
  }else{
    req.session.isAuth = true
    console.log('login success')
    // res.status(200).json({message: 'Authentication success.'})
    res.redirect('/post/dashboard')
  }
}

exports.isAuth = (req,res,next) => {
  if(req.session.isAuth){
    next()
  }else{
    res.redirect('/post/login')
  }
}

exports.dashboard = (req, res) => {
  res.send('in dashboard page')
  // console.log(req.body)
};
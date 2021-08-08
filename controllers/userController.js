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
          err.message || "Some error occurred while creating the User."
      });
      console.log({message: err.message || "Some error occurred while creating the User."})
    });

}

exports.findAll = (req, res) => {
  // const username = req.query.username;
  // var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  // set in param if have condition {where: condition}
  users = Users.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.getSession = (request, response) => {
  let sess = request.session
  console.log(sess)
  // response.status(200).json('email = ' + sess.email + '  ' + '_id = ' + sess._id)
  response.status(200).json({message: sess})
}


exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.json(data);
      console.log(data)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving Users with id=" + id
      });
    });
};


exports.logIn = async (req, res) => {
  if(req.body.username == null || req.body.password == null){
    console.log('username or password is invalid')
    res.status(401).json({message: 'username or password is invalid'})
    // res.redirect('/login')
    return;
  }
  const user = await Users.findOne({where: {username : req.body.username}})
  console.log(user.id)
  console.log(req.body.password, user.password)
  if(user == null || await bcrypt.compare(req.body.password, user.password) == false){
    console.log('incorrect username or password')
    res.status(401).json({message: 'Authentication failed. Incorrect username or password'})
    // res.redirect('/login')
    return;
  }else{
 
    req.session.isAuth = true
    req.session.username = user.username
    // res.json({massage : 'login success'})
    console.log('login success')
    // res.status(200).json({message: 'Authentication success.'})
    res.redirect('/post/dashboard')
  
}
  
}

exports.isAuth = (req,res,next) => {
  console.log(req.session.isAuth)
  if(req.session.isAuth){
    next()
  }else{
    res.redirect('/post/login')
    console.log(req.body)
  }
}

exports.dashboard = (req, res) => {
  res.send('in dashboard page')
  // console.log(req.body)
};

exports.logOut = (req,res) => {
  req.session.destroy((error) => {
    if(error) throw error;
  })

  res.redirect('/post/login')
}
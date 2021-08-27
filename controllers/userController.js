// const {User} = require('../models/PostModel')
const bcrypt = require('bcrypt')
const db = require('../models')
const Users = db.users
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const upload = require('../middleware/upload')
const fs = require('fs/promises')
const jwt = require('../middleware/jwt')
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

validateAndCreateUser = async (req,res) => {
  
  const {username , password:plainTextPassword ,emailOrMobile} = req.body
  let email = null
  let mobile = null
  let image = null
  let role = 'staff'
  const salt = await bcrypt.genSalt()
  const password = await bcrypt.hash(plainTextPassword,salt)
  const mailFormat = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/);
  const mobileFormat = new RegExp(/^(0[689]{1})+([0-9]{8})+$/);
  if(req.file){
    file = req.file.filename
  }
  if(req.role){
    role = req.role
  }
  if(mobileFormat.test(emailOrMobile) == false && mailFormat.test(emailOrMobile) == false){
    res.status(400).json({
      message: "Enter your moblie or email only"
    });
    console.log({
        message: "Enter your moblie or email only"
      })
      return false
    }else if(mailFormat.test(emailOrMobile) == false){
      mobile = emailOrMobile
    }else{
      email = emailOrMobile
    }
    
  

  if (!req.body.username  || !plainTextPassword || typeof req.body.username != 'string' || typeof plainTextPassword != 'string') {
    
    res.status(400).json({
      message: "username or password is empty! or invalid!"
      
    });
    
    console.log({
        message: "username or password is empty! or invalid!"
      })
      
      
      return false
  }
if(plainTextPassword.trim().length <= 8){
  res.status(400).json({
    message: "Password is toosmall. Should be atleast 8 characters"
  })
  
  return false
}
if(req.body.username.trim().length > 25){
  res.status(400).json({
    message: "Username is toolarge. Should be only 25 characters"
  })
  
  return false
}
if(req.body.username.trim().length < 6){
  res.status(400).json({
    message: "Username is toosmall. Should be atleast 6 characters"
  })
  
  return false
}
 

const user = {
  username: username,
  password: password,
  email: email,
  mobile: mobile,
  role: role,
  image: image
};
return user
}

exports.createUserAndUploadPic = async (req, res, next) => {
  // console.log(await test(req,res))
  validateAndCreateUser(req,res).then((data) => {
    if(data == false){
      if(req.file){
        fs.unlink('./images/'+req.file.filename)
        }
      return
    }else{
      Users.create(data)
      .then(data => {
       
        res.status(200).json(data);
        next()
      })
        .catch(err => {
          
          err.errors.forEach((error) => {
            console.log(error)
            if(error.validatorKey == 'not_unique'){
              // if(error.path.include('users')){
                error.message = error.value + ' is already in use'
              // }
              res.status(500).json({
            
                message:
                  error.message || "Some error occurred while creating the User."
                  
                  
              });
            }
          })
          
          // next()
          if(req.file){
            fs.unlink('./images/'+req.file.filename)
          }
        })
    }
  })
    

    
  }

  
exports.updateUserAndUploadPic = async (req, res, next) => {
  const User = await Users.findOne({where: {id: req.body.id}});
if (!User) {
  res.status(500).json({
        
    message: "cant find this user"
      
      
  });
}

validateAndCreateUser(req,res).then((data) => {
  if(data == false){
    if(req.file){
      fs.unlink('./images/'+req.file.filename)
      }
    return
  }else{
    User.update(data).then(data => {
      res.status(200).json(data)
    }).catch(err => {
          
      err.errors.forEach((error) => {
        console.log(error)
        if(error.validatorKey == 'not_unique'){
          // if(error.path.include('users')){
            error.message = error.value + ' is already in use'
          // }
          res.status(500).json({
        
            message:
              error.message || "Some error occurred while creating the User."
              
              
          });
        }
      })
      
      // next()
      if(req.file){
        fs.unlink('./images/'+req.file.filename)
      }
    })
  }})


}



//   validateFileNotNull =   (req,res) => {
//   console.log(req.body)
//   if(!req.file){
//     res.status(400).json({
//       message: "file is invalid"
//     })
//     console.log('error')
//     return false
//   }
  
// }

  

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

exports.loggedInUser = (req, res) => {
  // let sess = request.session
  // console.log(sess)
  // // response.status(200).json('email = ' + sess.email + '  ' + '_id = ' + sess._id)
  // response.status(200).json({message: sess})
  console.log(req.session.username)
  if(req.session.username){
    
    res.status(200).json({loggedIn: true, user: req.session.username})
    // next()
    
  }else{
    res.status(401).json({loggedIn: false})
  }
}


findByPk = (req, res) => {
  const id = req.body.id;

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

exports.findByUsername = (req, res) => {
  const username = req.body.username;

  Users.findOne({where: {username: username}})
    .then(data => {
      res.status(200).json(data);
      console.log(data)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving Users with username=" + username
      });
    });
};


exports.logIn = async (req, res) => {
  if(!req.body.username|| !req.body.password ){
    console.log('username or password is invalid')
    res.status(400).json({message: 'username or password is invalid'})
    // res.redirect('/login')
    return;
  }
  const user = await Users.findOne({where: {[Op.or]:[{username : req.body.username} , {email : req.body.username} , {mobile : req.body.username}]}})
  // console.log(user.id)
  // console.log(req.body.password, user.password)
  if(user == null || await bcrypt.compare(req.body.password, user.password) == false){
    console.log('incorrect username or password')
    res.status(401).json({message: 'Authentication failed. Incorrect username or password'})
    // res.redirect('/login')
    return;
  }else{
    // console.log(user.id)
    const token = jwt.createTokens(user)
    // req.session.isAuth = true
    res.cookie("access-token", token,{
      maxAge: 60*60*24*30*1000
    })
    req.session.username = user.username
    // req.session.token = token
    // res.json({massage : 'login success'})
    console.log(req.session)
    console.log('login success')
    res.status(200).json({message: 'login success.' , token : token})
    // res.redirect('http://localhost:3000/')
  
}
  
}

exports.validateLoggedIn = (req,res,next) => {
  console.log(req.session.username)
  if(req.session.username){
    
    // res.status(200).json({loggedIn: true, user: req.session.username})
    next()
    
  }else{
    res.status(401).json({message: 'please login first'})
  }
}

exports.dashboard = (req, res) => {
  res.status(400).json('in dashboard')
  console.log(req.body)
};

exports.logOut = (req,res) => {
  //maybe checklogin เอาออกนะ
  // if(req.session.username){
  res.cookie("access-token",null)
  req.session.destroy((error) => {
    if(error){ 
      res.status(500).json({message: 'logout failed ' + error}) }
    else{
      res.status(200).json({message: 'logout success'})
    };
  })
}
// else{
//   res.status(401).json({message: 'please login first'})
// }

  


// }
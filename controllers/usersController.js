
const db = require('../models')
const Users = db.users
const fs = require('fs/promises')
const userInfoValid = require('../middleware/UserInfoValidation')

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


exports.createUserAndUploadPic = async (req, res, next) => {
  userInfoValid.validateAndCreateUser(req, res).then(async (data) => {
    if (data == false) {
      if (req.file) {
        fs.unlink('./images/' + req.file.filename)
      }
      return
    } else {
      await Users.create(data)
        .then(data => {
          res.status(200).json(data);
          next()
        })
        .catch(err => {
          console.log(err.errors)
          if(err.errors){
            
          err.errors.forEach((err) => {
            console.log(err.message)    
            if(err.validatorKey && err.validatorKey == 'not_unique'){
              err.message = err.value + ' is already in use' 
            }
            
            
          })
          res.status(500).json({
            message: err.message || "Some error occurred while creating the User."
          });  
        }
        
          if (req.file) {
            fs.unlink('./images/' + req.file.filename)
          }
        })
    }
  })
}


exports.updateUserAndUploadPic = async (req, res, next) => {
  const User = await Users.findOne({
    where: {
      id: req.body.id
    }
  });
  if (!User) {
    res.status(500).json({
      message: "cant find this user"
    });
    return
  }

  userInfoValid.validateAndUpdateUser(req, res).then((data) => {
    if (data == false || !User) {
      if (req.file) {
        fs.unlink('./images/' + req.file.filename)
      }
      return
    } else {
      User.update(data).then(data => {
        res.status(200).json(data)
      }).catch(err => {

        if(err.errors){
          err.errors.forEach((err) => {
            console.log(err.message)    
            if(err.validatorKey && err.validatorKey == 'not_unique'){
              err.message = err.value + ' is already in use' 
            }
            res.status(500).json({
              message: err.message || "Some error occurred while creating the User."
            });  
          })
        }

        if (req.file) {
          fs.unlink('./images/' + req.file.filename)
        }
      })
    }
  })
}

exports.delete = async (req, res) => {
  const User = await Users.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!User) {
    res.status(500).json({
      message: "cant find this user"
    });
    return
  }
  User.destroy().then(data => {
    res.status(200).json({message : 'deleted user ' + data.username})
  }).catch(err => {
    res.status(500).json(err.message)
  })
}

exports.findAll = (req, res) => {
  // const username = req.query.username;
  // var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  // set in param if have condition {where: condition}
  Users.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};



exports.findByUsername = (req, res) => {
  const username = req.body.username;

  Users.findOne({
      where: {
        username: username
      }
    })
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






// exports.dashboard = (req, res) => {
//   res.status(400).json('in dashboard')
//   console.log(req.body)
// };


// else{
//   res.status(401).json({message: 'please login first'})
// }

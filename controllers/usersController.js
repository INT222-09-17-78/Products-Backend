
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
  userInfoValid.validateAndCreateOrUpdateUser(req, res).then((data) => {
    if (data == false) {
      if (req.file) {
        fs.unlink('./images/' + req.file.filename)
      }
      return
    } else {
      Users.create(data)
        .then(data => {
          res.status(200).json(data);
          next()
        })
        .catch(err => {
          err.errors.forEach((error) => {
            console.log(error)
            if(!(!error.validatorKey)){
            if (error.validatorKey == 'not_unique') {
              error.message = error.value + ' is already in use'
              res.status(500).json({
                message: error.message || "Some error occurred while creating the User."
              });
            }}
          })
          
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
  }

  userInfoValid.validateAndCreateOrUpdateUser(req, res).then((data) => {
    if (data == false) {
      if (req.file) {
        fs.unlink('./images/' + req.file.filename)
      }
      return
    } else {
      User.update(data).then(data => {
        res.status(200).json(data)
      }).catch(err => {

        err.errors.forEach((error) => {
          console.log(error)
          // if (error.validatorKey == 'not_unique') {
          //   error.message = error.value + ' is already in use'
            res.status(500).json({
              message: error.message || "Some error occurred while updating the User."
            });
          // }
        })

        if (req.file) {
          fs.unlink('./images/' + req.file.filename)
        }
      })
    }
  })
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

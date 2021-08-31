const db = require('../models')
const Users = db.users

exports.updateRole = async(req,res) => {
    const role = req.body.id
    console.log(role)
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
    if(User.dataValues.role == 'Admin'){
      res.status(500).json({
        message: "this user is already admin"
      });
    }
    User.update({role:'Admin'}).then(data => {
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
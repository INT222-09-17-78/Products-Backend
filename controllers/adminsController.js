const db = require('../models')
const Users = db.users

exports.updateRole = async(req,res) => {
    
    
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
      return
    }
    User.update({role:'Admin'}).then(data => {
      res.status(200).json(data)
    }).catch(err => {

          res.status(500).json({
            message: err.message || "Some error occurred while updating the User."
          });

      })
  
      if (req.file) {
        fs.unlink('./images/' + req.file.filename)
      }
    
  }
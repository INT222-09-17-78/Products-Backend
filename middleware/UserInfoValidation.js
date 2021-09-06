const bcrypt = require('bcrypt')
exports.validateAndCreateOrUpdateUser = async (req, res) => {
    // console.log(req.body)
    // console.log('log')
    const {
      username,
      password: plainTextPassword,
      emailOrMobile
    } = req.body
    let email = null
    let mobile = null
    let image = null
    let role = 'staff'
    const salt = await bcrypt.genSalt()
    const mailFormat = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/);
    const mobileFormat = new RegExp(/^(0[689]{1})+([0-9]{8})+$/);
    if (req.file) {
      image = req.file.filename
    }
    // if (req.role) {
    //   role = req.role
    // }
    if (mobileFormat.test(emailOrMobile) == false && mailFormat.test(emailOrMobile) == false) {
      res.status(400).json({
        message: "Enter your moblie or email only"
      });
      console.log({
        message: "Enter your moblie or email only"
      })
      return false
    } else if (mailFormat.test(emailOrMobile) == false) {
      mobile = emailOrMobile
    } else {
      email = emailOrMobile
    }
  
    if (!req.body.username || !plainTextPassword || typeof req.body.username != 'string' || typeof plainTextPassword != 'string') {
  
      res.status(400).json({
        message: "username or password is empty! or invalid!"
      });
      console.log({
        message: "username or password is empty! or invalid!"
      })
  
      return false
    }
    if (plainTextPassword.trim().length <= 8) {
      res.status(400).json({
        message: "Password is toosmall. Should be atleast 8 characters"
      })
  
      return false
    }
    if (req.body.username.trim().length > 25) {
      res.status(400).json({
        message: "Username is toolarge. Should be only 25 characters"
      })
  
      return false
    }
    if (req.body.username.trim().length < 6) {
      res.status(400).json({
        message: "Username is toosmall. Should be atleast 6 characters"
      })
  
      return false
    }
    const password = await bcrypt.hash(plainTextPassword, salt)
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
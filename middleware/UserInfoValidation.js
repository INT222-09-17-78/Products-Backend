exports.validateAndCreateUser = async (req, res) => {

  const {
    username,
    password,
    emailOrMobile
  } = req.body
  let email = null
  let mobile = null
  let image = null
  let role = 'Staff'

  const mailFormat = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/);
  const mobileFormat = new RegExp(/^(0[689]{1})+([0-9]{8})+$/);
  if (req.file) {
    image = req.file.filename
  }

  if (mailFormat.test(emailOrMobile) == false && mobileFormat.test(emailOrMobile) == true) {
    mobile = emailOrMobile
  } else if (mailFormat.test(emailOrMobile) == true) {
    email = emailOrMobile
  } else {
    res.status(400).json({
      message: "Plase input email or mobile"
    });
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

exports.validateAndUpdateUser = async (req, res) => {

  const {
    username,
   
    email,
    mobile,
    role
  } = req.body

  let image = null

  if (req.file) {
    image = req.file.filename
  }

  const user = {
    username: username,
   
    email: email,
    mobile: mobile,
    image: image,
    role: role,
  };
  return user

}
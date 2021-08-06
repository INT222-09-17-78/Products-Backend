const {User} = require('../models/PostModel')
const bcrypt = require('bcrypt')

exports.postUser = async (req,res) => {
    const {username , password: plainTextPassword } = req.body
    const password = await bcrypt.hash(plainTextPassword,10)
    try {
        const res = await User.create({
            username,
            password
        })
        console.log('create user successfully')
    } catch (error) {
        res.json(error)
    }
}
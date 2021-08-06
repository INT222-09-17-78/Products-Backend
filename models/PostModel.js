const mongoose = require('mongoose')

const post = new mongoose.Schema({
    // _id:{
    //     type: Number,
    //     required: true
    // },
    // title: { 
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
    test:{
        type: Number,
        required: true
    }
},
    {collection:'post'}
    // id: {

    // }
)

const users = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required : true
    } ,
},
    {collection:'users'}
    
)

const PostSchema = mongoose.model('asdasd', post)
const UserSchema = mongoose.model('users', users)

module.exports = {
    Post : PostSchema,
    User : UserSchema,
}
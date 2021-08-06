const Post = require('../models/PostModel')

exports.getAllPost = async (req,res) => {
    try {
        const getAllPost = await Post.find()
        res.json(getAllPost)
    } catch (error) {
        res.json(error)
    }
}

exports.postOne = async (req,res) => {
    const post = new Post({
        test: req.body.test
    })
    try {
        const savePost = await post.save();
        res.json(savePost)
    } catch (error) {
        res.json(error)
    }
        
    
    console.log(Number.isInteger(req.body.test));
}

exports.getById = async (req,res) => {
    try{
    const post = await Post.findById(req.params.postId)
    res.json(post)
    console.log(req.params.postId)
}catch(error){
    res.json(error)
}
}

exports.deleteById = async (req,res) => {
    try{
    const post = await Post.findByIdAndDelete(req.params.postId)
    res.json(post)
    console.log(req.params.postId)
}catch(error){
    res.json(error)
}
}

exports.updateById = async (req,res) => {
    try{
    // const post = await Post.findByIdAndUpdate({_id : req.params.postId} , req.body).then(() => Post.findOne({_id : req.params.postId}))
    const post = await Post.updateOne({_id : req.params.postId} , {$set: {test: req.body.test}})
    res.json(post)
    console.log(req.params.postId)
}catch(error){
    res.json(error)
}

// const post = new Post({
//     test: req.body.test
// })
// try {
//     const savePost = await post.save();
//     res.json(savePost)
// } catch (error) {
//     res.json(error)
// }
}
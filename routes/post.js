const express = require('express')

const router = express.Router()

const Post = require('../models/PostModel')
// router.get('/posts', (req,res) => {
//     res.send('on post')
// })

router.get('/', async (req,res) => {
    try {
        const getAllPost = await Post.find()
        res.json(getAllPost)
    } catch (error) {
        res.json(error)
    }
})

router.post('/', async (req,res) => {
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
})

router.get('/:postId', async (req,res) => {
    try{
    const post = await Post.findById(req.params.postId)
    res.json(post)
    console.log(req.params.postId)
}catch(error){
    res.json(error)
}
})

// router.delete('/:Id', async (req,res) => {
    
//     // try{
//     const post = Post.findByIdAndDelete(req.params.Id)
    
//     res.json({success: true})
//     console.log(req.params.Id)
//     // }catch(error){
//     //     res.json(error)
//     // }
// })

router.delete('/:postId', async (req,res) => {
    try{
    const post = await Post.findByIdAndDelete(req.params.postId)
    res.json(post)
    console.log(req.params.postId)
}catch(error){
    res.json(error)
}
})

router.put('/:postId', async (req,res) => {
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
})

module.exports = router;
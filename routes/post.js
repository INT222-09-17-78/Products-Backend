const express = require('express')

const router = express.Router()


// router.get('/posts', (req,res) => {
//     res.send('on post')
// })
// const postController = require('../controllers/postController') 
const userController = require('../controllers/userController')

router.post('/' , userController.create)

// router.get('/', postController.getAllPost)

// router.post('/', postController.postOne)

// router.get('/:postId', postController.getById)

// router.delete('/:Id', async (req,res) => {
    
//     // try{
//     const post = Post.findByIdAndDelete(req.params.Id)
    
//     res.json({success: true})
//     console.log(req.params.Id)
//     // }catch(error){
//     //     res.json(error)
//     // }
// })

// router.delete('/:postId', postController.deleteById)

// router.put('/:postId', postController.updateById)

module.exports = router;
const express = require('express')

const router = express.Router()
const upload = require('../middleware/upload')

// router.get('/posts', (req,res) => {
//     res.send('on post')
// })
// const postController = require('../controllers/postController') 
const userController = require('../controllers/userController')
// const upload = require('../middleware/upload')

router.get('/dashboard'  ,userController.isAuth, userController.dashboard)
router.post('/uploadNone' ,upload.uploadUser.none(),userController.createUserAndUploadPic )
router.post('/upload',upload.uploadUser.single('file'),userController.createUserAndUploadPic)

router.get('/' , userController.findAll)
router.get('/session' , userController.getSession)
router.get('/findUserById/:id' , userController.findByPk)
router.get('/findUserByUsername/' , userController.findByUsername)
router.post('/login' , userController.logIn)
router.post('/logout', userController.logOut)
router.get('/login', (req,res) => {
    res.send('on login')
})
// router.use(userController.validate)
// router.use(upload.uploadUser.single('file'))


// router.get('/', postController.getAllPost)
// router.get('/login', (req,res) => {
//     res.send('plase login')
// })

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
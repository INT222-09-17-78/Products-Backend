const express = require('express')
const router = express.Router()
// const upload = require('../middleware/upload')
const auth = require('../middleware/auth')
const loginLogoutController = require('../controllers/loginLogoutController')
const usersController = require('../controllers/usersController')
const adminsController = require('../controllers/adminsController')
const uplaod = require('../controllers/uploadsController')
// router.post('/users/userAndUpload' ,(req,res,next)=>{
//     (upload.uploadUserPromise)(req,res  , (err) => {
//         if(err){
//             res.status(400).json({message:"file is invalid"})
//         }else{
//             next()
//         }
//     })
// } , (usersController.createUserAndUploadPic)
// )
// router.put('/users/userAndUpload',auth.validateLoggedIn, auth.validateToken,(req,res,next)=>{
//     (upload.uploadUser.single('file'))(req,res  , (err) => {
//         if(err){
//             res.status(400).json({message:"file is invalid"})
//         }else{
//             next()
//         }
//     })
// } , (usersController.updateUserAndUploadPic))
// router.post('/upload',upload.uploadUser.single('file'),userController.createUserAndUploadPic)
router.post('/users/userAndUpload', usersController.createUserAndUploadPic)
router.put('/users/userAndUpload', uplaod.uploadFile ,auth.validateLoggedIn, auth.validateToken, usersController.createUserAndUploadPic)
router.get('/users' , usersController.findAll)
// router.get('/session' , userController.getSession)
router.put('/users/admin/updateRole', auth.validateLoggedIn, auth.validateToken ,auth.ValidateAdmin,adminsController.updateRole)
// router.get('/findUserById/:id' , userController.findByPk)
router.post('/users/login' , loginLogoutController.logIn)
router.get('/users/login' , loginLogoutController.loggedInUser)
router.get('/users/logout' ,auth.validateLoggedIn, auth.validateToken  , loginLogoutController.logOut)
router.get('/users/findUserByUsername/' , usersController.findByUsername)


// router.get('/login', (req,res) => {
//     res.send('on login')
// })
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
const express = require('express')
const router = express.Router()
// const upload = require('../middleware/upload')
const auth = require('../middleware/auth')
const loginLogoutController = require('../controllers/loginLogoutController')
const usersController = require('../controllers/usersController')
const adminsController = require('../controllers/adminsController')
const upload = require('../controllers/uploadsController')
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
router.put('/users/userAndUpload',  auth.validateToken,auth.ValidateAdmin, usersController.updateUserAndUploadPic)
router.get('/users' , usersController.findAll)
router.delete('/users/delete/:id' ,auth.validateToken,auth.ValidateAdmin, usersController.delete)
// router.get('/session' , userController.getSession)
router.put('/users/admin/updateRole',  auth.validateToken ,auth.ValidateAdmin,adminsController.updateRole)
// router.get('/users/:id' , usersController.findByPk)
router.post('/users/login' , loginLogoutController.logIn)
router.get('/users/login' ,auth.validateToken, loginLogoutController.loggedInUser)
router.get('/users/logout' , auth.validateToken  , loginLogoutController.logOut)
router.get('/users/findUserByUsername/' ,auth.validateToken,auth.ValidateAdmin, usersController.findByUsername)


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



module.exports = router;
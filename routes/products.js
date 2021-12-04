const express = require('express')
const router = express.Router()
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const productsController = require('../controllers/productsController')
const upload = require('../controllers/uploadsController')
const auth = require('../middleware/auth')

router.post('/create/product' , auth.validateToken,upload.uploadFile, productsController.createProduct)
router.get('/show/products',auth.validateTokenPublic, productsController.getAllProducts)
router.get('/show/product/:id' ,auth.validateTokenPublic, productsController.findProductById)
router.get('/show/product/brand/:id' ,auth.validateTokenPublic,productsController.findProductByBrand)
router.put('/update/product/:ProdID' , auth.validateToken,upload.uploadFile, productsController.editProduct)
router.delete('/delete/product/:ProdID' , auth.validateToken,productsController.deleteProduct)
module.exports = router;
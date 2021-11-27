const express = require('express')
const router = express.Router()
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const productsController = require('../controllers/productsController')
const upload = require('../controllers/uploadsController')
router.post('/create/product',upload.uploadFile, productsController.createProduct)
router.get('/show/products', productsController.getAllProducts)
router.get('/show/product/:id', productsController.findProductById)
router.get('/show/product/brand/:id' ,productsController.findProductByBrand)
router.put('/update/product/:ProdID' ,upload.uploadFile, productsController.editProduct)
router.delete('/delete/product/:ProdID' ,productsController.deleteProduct)
module.exports = router;
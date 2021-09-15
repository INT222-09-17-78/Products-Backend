const express = require('express')
const uplaod = require('../controllers/uploadsController')
const router = express.Router()
const productsController = require('../controllers/productsController')
router.post('/create/product', uplaod.uploadFile, productsController.createProduct)
router.get('/show/products', productsController.getAllProducts)
router.get('/show/product/:id', productsController.findProductById)
router.get('/show/product/brand/:id' ,productsController.findProductByBrand)

module.exports = router;
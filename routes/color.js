const express = require('express')
const router = express.Router()
const colorsController = require('../controllers/colorsController');

router.post('/create/color', colorsController.createColor)

module.exports = router;
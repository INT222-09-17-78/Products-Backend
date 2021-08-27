const db = require('../models')
const Brands = db.brands
exports.createBrand = (req,res) => {
    console.log(req.body)
    Brands.create({
        BrandName : req.body.BrandName
    }).then(data => res.json(data))
}

exports.getAllBrands = (req,res) => {
    Brands.findAll({
        include: ["Products"]
    }).then(data => res.json(data))
}
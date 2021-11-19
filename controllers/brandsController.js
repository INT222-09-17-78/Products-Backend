const db = require('../models')
const Brands = db.brands
exports.createBrand = (req,res) => {
    console.log(req.body)
    Brands.create({
        BrandName : req.body.BrandName
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(500).json({message : err.message})
    })
}

exports.getAllBrands = (req,res) => {
    Brands.findAll({
        include: ["Products"]
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(500).json({message : err.message})
    })
}
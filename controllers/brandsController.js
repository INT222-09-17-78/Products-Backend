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


exports.editBrand = (req , res) => {
    Brands.update({
        BrandName : req.body.BrandName
    },{
        where : {
            BrandId : req.body.BrandId
        }
    }).then(rowUpdate => {
        if(rowUpdate == 1){
            res.status(200).json('update success')
        }else{
            res.status(500).json('cant find row to update maybe something wrong')
        }
    }).catch(err => {
        res.status(500).json({message : err.message})
    })
}

exports.deleteBrand = (req, res) => {
    Brands.destroy({
        where: {
            BrandId : req.params.BrandId
        }
    }).then(deletedProdRow => {
        if (deletedProdRow == 1) {
            res.status(200).json('deleted success')
          } else {
            res.status(500).json('cant find row to delete or maybe something wrong')
          }
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
}


exports.getAllBrands = (req,res) => {
    Brands.findAll({
        include: ["Products"]
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(500).json({message : err.message})
    })
}
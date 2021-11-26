const db = require('../models')
const Sizes = db.sizes
exports.createSize = (req,res) => {
    console.log(req.body)
    Sizes.create({
        SizeName : req.body.SizeName,
        Description : req.body.Description
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(200).json({message:err.message})
    })
    // Sizes.addProducts
}


exports.editSize = (req,res) => {
    Sizes.update({
        SizeName : req.body.SizeName,
        Description : req.body.Description
    },{
        where : {
            SizeName : req.body.SizeName
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

exports.deleteSize = (req,res) => {
    Sizes.destroy({
        where: {
        SizeName : req.body.SizeName
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


exports.getAllSizes = (req,res) => {
    Sizes.findAll({
        include: ["Products"]
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(500).json({message : err.message})
    })
}

exports.getSize
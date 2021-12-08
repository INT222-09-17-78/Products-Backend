const db = require('../models')
const Pattern = db.patterns
const Product = db.products
const fs = require('fs/promises')
exports.createPattern = (req, res) => {
    // console.log(req.body)
    // console.log(req.files,'as')
    // console.log(req.file)
    // console.log(req.body.images)
    const patterns = req.body.patterns
    // const patterns = JSON.parse(req.body.patterns)
    
    
    for(let i =0;i<patterns.length;i++){
        console.log(patterns)
        if(patterns[i].color === ''){
            Product.destroy({where:{ProdID:patterns[i].ProdID}})
            
        }
    }
    Pattern.bulkCreate(patterns, { validate: true }).then(data => 
        {
            
         res.status(200).json(data)}).catch(err => {

        if (req.files) {
            //     fs.unlink('./images/' + req.file.filename)
            for (let i = 0; i < req.files.length; i++) {
                fs.unlink('./images/patterns/' + req.files[i].filename)
            }
        }
        if(err.message === ''){err.message = 'some field may empty'}
        res.status(500).json({ message: err.message })
    })
}

exports.editPattern = (req, res) => {
    // Pattern.update({},{
    //     where: {

    //     }
    // })
    // const patterns = req.body.patterns
    const patterns = JSON.parse(req.body.patterns)

    // Pattern.findAll({
    //     where: {
    //         ProdID: req.body.patterns[0].ProdID
    //     }
    // }).then(patterns => {
        // if (req.files) {
        //     for (let i = 0; i < patterns.length; i++) {
                
        //         for (let j = 0; j < req.files.length; j++) {
        //             console.log(patterns[i].PatternName) 
        //             console.log(req.files[j].filename)
        //             if (patterns[i].PatternName != req.files[j].filename) {
        //                 // console.log(patterns[i].PatternName + " " + req.files[j].filename)
        //                 fs.unlink('./images/' + req.files[i].filename)
        //             }
        //         }
        //     }
        // }
        Pattern.bulkCreate(patterns, { updateOnDuplicate: ["PatternImage", "color"], validate: true }).then(data => res.status(200).json(data)).catch(err => {

            console.log(req.files)
            if (req.files) {
                for (let i = 0; i < req.files.length; i++) {
                    // if (patterns[i].PatternName != req.files[i].filename) {
                    fs.unlink('./images/patterns/' + req.files[i].filename)
                    // }
                }
            }
            res.status(500).json({ message: err.message })
        })
    // }).catch(err => {
    //     if (req.files) {
    //         for (let i = 0; i < req.files.length; i++) {
    //             // if (patterns[i].PatternName != req.files[i].filename) {
    //             fs.unlink('./images/' + req.files[i].filename)
    //         }
    //         // }
    //     }
    //     res.status(500).json({ message: err.message })
    // })

}

exports.deletePatterns = async (req, res) => {
    // console.log(req.body.patterns)
    // const patterns = req.body.patterns
    try {
        // if(!req.file){
            // return res.status(500).json({message: "delete failed , don't have a file to delete"})
        // }else{
            fs.unlink('./images/patterns/' + req.params.PatternImage)
        // }
      const deletedProdRow = await Pattern.destroy({
        where: {
            PatternImage: req.params.PatternImage
        }
      })
    //   console.log(deletedProdRow)
      if (deletedProdRow == 1) {
        res.status(200).json("deleted success")
      } else {
        res.status(500).json("maybe something wrong or don't have image to delete")
      }
  
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
}

exports.getAllPatterns = (req, res) => {
    Pattern.findAll({
        include: ["Products"]
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(500).json({ message: err.message })
    })
}

// exports.getPatternsByProd = (req,res) => {

// }
const db = require('../models')
const Products = db.products
// const Colors = db.colors
const fs = require('fs/promises')
exports.createProduct = async  (req,res) => {
    console.log(req.file)
    // const images = [
    //   "ColorID","asdasd"
    const sizes = req.body.sizes
    console.log(colors[0].ColorID)
     
    // ]
    try {
      // const color = await Colors.findAll()
      // console.log(color)
    const product = await Products.create({
        ProdName : req.body.ProdName,
        Price: req.body.Price,
        Description: req.body.Description,
        ProduceDate: req.body.ProduceDate,
        BrandID: req.body.BrandID,
        image: req.body.image
    })
    // for await (let x of color) {
    //   console.log(x.key)
      // data = await product.addColors(x.ColorID,{through: {ImageName:images[x]}})
    // }
    const data = []
    for (let i = 0; i < colors.length; i++) {
      data.push(await product.addSizes(sizes[i].SizeName,{through: {ImageName:'sizes[i].name',Colors:'sizes[i].color'}}))
    }
    
    res.status(200).json(
      {prouct:product,
       colors:data})
    } catch (error) {
      
      if(!(!error.parent)){
      if((error.parent.code).includes('ER_NO_REFERENCED_ROW')){
        error.message = 'Maybe you your input brand or color does not exist'
      }}
      res.status(500).json({
        message: error.message || "Some error occurred while creating the Product."
      });
    }
    //do loop to delete file if error
    if (req.file) {
      fs.unlink('./images/' + req.file.filename)
    }
}

exports.findProductById = (req,res) => {
    Products.findByPk(req.params.id, {include:["Brands"]}).then(data => {
        res.json(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving Product with id=" + req.params.id
        });
      });
}

exports.findProductByBrand = (req,res) => {
    Products.findAll({where: {BrandID: req.params.id}}).then(data => {
        res.json(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving Product with brand=" + req.params.id
        });
      });
}

exports.getAllProducts = (req,res) => {
    Products.findAll({
        include: ["Brands","Sizes"]
    }).then(data => res.json(data))
}

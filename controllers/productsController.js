const db = require('../models')
const Products = db.products
// const Colors = db.colors
// const fs = require('fs/promises')
exports.createProduct = async  (req,res) => {
    // console.log(req.file)
    // const images = [
    //   "ColorID","asdasd"
    // const sizes = [{"SizeName":"large"}]
    // console.log(sizes.SizeName)
    // console.log(colors[0].ColorID)  
    console.log(req.body)
    // ]
    try {
      // const color = await Colors.findAll()
      // console.log(color)
    const jsonProduct = req.body.product
    // const jsonProduct = JSON.parse(req.body.product)
    const product = await Products.create({
        ProdName : jsonProduct.ProdName,
        Price: jsonProduct.Price,
        Description: jsonProduct.Description,
        ProduceDate: jsonProduct.ProduceDate,
        BrandId: jsonProduct.BrandId,
        Image: jsonProduct.Image
        // image: req.body.image
    })
    // for await (let x of color) {
    //   console.log(x.key)
      // data = await product.addColors(x.ColorID,{through: {ImageName:images[x]}})
    // }
    // const data = []
    const sizes = jsonProduct.Sizes
    for (let i = 0; i < sizes.length; i++) {
      // data.push(await product.addSizes(sizes[i].SizeName,{through: {ImageName:'sizes[i].name',Colors:'sizes[i].color'}}))
      await product.addSizes(sizes[i].SizeName)
      // data.push({Size_SizeName:sizes[i].SizeName})
    }
    
    res.status(200).json(
      {prouct:product,
       sizes:sizes})
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
    // if (req.file) {
    //   fs.unlink('./images/' + req.file.filename)
    // }
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
        include: ["Brands","Sizes","Patterns"]
    }).then(data => res.json(data))
}

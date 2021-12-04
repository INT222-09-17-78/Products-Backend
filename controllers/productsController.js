// const e = require('express')
const db = require('../models')
// const upload = require('./uploadsController')
const Products = db.products
const Sizes = db.sizes
const fs = require('fs/promises')
// const Colors = db.colors
// const fs = require('fs/promises')
exports.createProduct = async (req, res) => {
  // console.log(req.file)
  // const images = [
  //   "ColorID","asdasd"
  // const sizes = [{"SizeName":"large"}]
  // console.log(sizes.SizeName)
  // console.log(colors[0].ColorID)  
  // ]
  try {
    // const color = await Colors.findAll()
    // console.log(color)
    // const jsonProduct = req.body.product
    const jsonProduct = JSON.parse(req.body.product)
    const product = await Products.create({
      ProdName: jsonProduct.ProdName,
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
      {
        product: product,
        sizes: sizes
      })
  } catch (error) {

    if (!(!error.parent)) {
      if ((error.parent.code).includes('ER_NO_REFERENCED_ROW')) {
        error.message = 'Maybe you your input brand or size does not exist'
      }
    }
    res.status(500).json({
      message: error.message || "Some error occurred while creating the Product."
    });
  }
  //do loop to delete file if error
  // if (req.file) {
  //   fs.unlink('./images/' + req.file.filename)
  // }
}

exports.editProduct = (req, res) => {
  const SizeName = []
  const jsonProduct = req.body.product
  // const jsonProduct = JSON.parse(req.body.product)
  const sizes = jsonProduct.Sizes
  Products.findByPk(req.params.ProdID).then((product) => {
    if (req.file && product.Image != jsonProduct.Image) {
      fs.unlink('./images/' + product.Image)
    }
    product.set(
      {
        ProdName: jsonProduct.ProdName,
        Price: jsonProduct.Price,
        Description: jsonProduct.Description,
        ProduceDate: jsonProduct.ProduceDate,
        BrandId: jsonProduct.BrandId,
        Image: jsonProduct.Image
      }
    )
    product.save().then((result) => {
      for (let i = 0; i < sizes.length; i++) {
        SizeName.push(sizes[i].SizeName)
      }
      // console.log(SizeName)
      Sizes.findAll({ where: { SizeName: SizeName } }).then((size) => {
        product.setSizes(size)
        //   consoloe.log(upload.getFileByName(jsonProduct.Image))
        //   if(upload.getFileByName(jsonProduct.Image)){  
        //     fs.unlink('./images/' + jsonProduct.Image)
        // }
        // 1200px-Image_created_with_a_mobile_phone.png
        res.status(200).json(result)
      }).catch((err) => {
        if (req.file) {
          fs.unlink('./images/' + jsonProduct.Image)
        }
        res.status(500).json({ message: err.message })
      })
    }).catch(err => {
      if (req.file) {
        fs.unlink('./images/' + jsonProduct.Image)
      }
      res.status(500).json({ message: err.message })
    })
  })


  //     Products.update({
  //     ProdName : jsonProduct.ProdName,
  //     Price: jsonProduct.Price,
  //     Description: jsonProduct.Description,
  //     ProduceDate: jsonProduct.ProduceDate,
  //     BrandId: jsonProduct.BrandId,
  //     Image: jsonProduct.Image
  // },{
  //   where: {
  //     ProdID : jsonProduct.ProdID,
  //   }
  // })
  // .then(() => {
  //   Products.findByPk(jsonProduct.ProdID).then((product) => {
  //     for (let i = 0; i < sizes.length; i++) {
  //       SizeName.push(sizes[i].SizeName)
  //     }
  //     // console.log(SizeName)
  //     Sizes.findAll({where:{SizeName:SizeName}}).then((size)=>{
  //       product.setSizes(size)
  //     //   consoloe.log(upload.getFileByName(jsonProduct.Image))
  //     //   if(upload.getFileByName(jsonProduct.Image)){  
  //     //     fs.unlink('./images/' + jsonProduct.Image)
  //     // }
  //       // 1200px-Image_created_with_a_mobile_phone.png
  //       res.status(200).json({message : 'update success'})
  //     }).catch((err) => {
  //       res.status(500).json({message : err.message})
  //     })

  //   }).catch((err)=>{
  //     res.status(500).json({message : err.message})
  //   })
  // })

  // console.log(SizeName)
  // console.log(product)
  // const sizes = await Sizes.findAll({where:{SizeName:SizeName}})
  // console.log(sizes)
  // for (let i = 0; i < sizes.length; i++) {
  //   await product.setSizes(sizes)
  // }


}

exports.deleteProduct = async (req, res) => {
  console.log(req.body.ProdID)
  try {
    const deletedProdRow = await Products.destroy({
      where: {
        ProdID: req.params.ProdID
      }
    })
    if (deletedProdRow == 1) {
      res.status(200).json('deleted success')
    } else {
      res.status(500).json('maybe something wrong')
    }

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.findProductById = (req, res) => {
  Products.findByPk(req.params.id, { include: ["Brands", "Sizes", "Patterns"] }).then(data => {
    if(data){
      res.status(200).json(data);
    }else{
      res.status(500).json({message:'cant find product'})
    }
    
    console.log(data)
  })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving Product with id=" + req.params.id
      });
    });
}

exports.findProductByBrand = (req, res) => {
  Products.findAll({ where: { BrandID: req.params.id } }).then(data => {
    res.json(data);
    console.log(data)
  })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving Product with brand=" + req.params.id
      });
    });
}

exports.getAllProducts = (req, res) => {
  Products.findAll({
    include: ["Brands", "Sizes", "Patterns"]
  }).then(data => res.json(data))
}

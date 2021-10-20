// const db = require('../models')
// const Colors = db.colors
// const Products = db.products
// exports.findall = async (req,res) => {
//     let data = await Products.findAll(
//         {include:[{
//           model: Colors,
//           as:"Colors",
//           attributes:['ColorID','ColorName'],
//           through: {
//             attributes: ['ImageName'],
//           }}],
//         }
//     )
//   //   let data = await Colors.findAll(
//   //     {include:[{
//   //       model: Products,
//   //       as:"Products",
        
//   //       through: {
//   //         attributes: ['ImageName'],
//   //       }}],
//   //     }
//   // )
//     res.json(data)
// }

// exports.addColor = async(req, res) => {
//     // return Colors.findByPk(1)
//     //   .then((color) => {
//     //     if (!color) {
//     //       console.log("Tag not found!");
//     //       return null;
//     //     }
//     //     return Products.findByPk(1).then( async (product) => {
//     //       if (!product) {
//     //         console.log("Tutorial not found!");
//     //         return null;
//     //       }
  
//     //       await Colors.addColor(product);
//     //     //   console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
//     //       return product;
//     //     });
//     //   })
//     //   .catch((err) => {
//     //     console.log(">> Error while adding Tutorial to Tag: ", err);
//     //   });
//     const brands = await db.brands.create({
//       "BrandName":"asdasd"
//     })
//     const products = await db.products.create(
//       {
//     "ProdName" : "testname",
//     "Price": 2,
//     "Description": "asdasd",
//     "ProduceDate": "2021-08-27T11:28:47.197Z",
//     "BrandID": 1

// }
//     )
//     const colors = await db.colors.create(
//       {
//         "ColorName":"Colorasdasd"
   
//    }
//     )
//    data =  await products.addColors(colors,{through: {ImageName:'asdasd'}})

//     res.json(data)
//   };
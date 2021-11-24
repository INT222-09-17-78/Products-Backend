const express = require('express')
const app = express()
const usersRoutes = require('./routes/users')
const brandsRoutes = require('./routes/brands')
const productsRoutes = require('./routes/products')
const SizesRoutes = require('./routes/sizes')
const uploadsRoutes = require('./routes/upload')
const patternsRoutes = require('./routes/patterns')
// const cookieSession = require('cookie-session')
// const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

global.__basedir = __dirname; 
app.use(cors(
  {
    origin: process.env.CORS,credentials:true,//access-control-allow-credentials:true optionSuccessStatus:200}
  }
))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}));

// app.use(session({
//   secret: 'integratedProj2',
//   resave: false,
//   saveUninitialized: true
// }))



const db = require('./models')

app.use('/api' , usersRoutes , productsRoutes, brandsRoutes , uploadsRoutes , SizesRoutes , patternsRoutes
)
// app.use('/api' , ProductsRoutes )
// app.use('/api' ,  brandsRoutes )
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
//   });

db.sequelize.sync({force:true}).then((res) => {
    app.listen(process.env.PORT, () => {
        console.log('server is running on port '+process.env.PORT)
    })
})
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
const allowedDomains = [process.env.CORS,process.env.CORS2]
app.use(cors(
  {
    origin: 'http://20.205.212.121:8080',credentials:true,//access-control-allow-credentials:true optionSuccessStatus:200}
  }
))
// app.use(cors({
//   origin: function (origin, callback) {
//     // bypass the requests with no origin (like curl requests, mobile apps, etc )
//     if (!origin) return callback(null, true);
 
//     if (allowedDomains.indexOf(origin) === -1) {
//       var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));
app.use(express.json({limit:'16mb'}));
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
const express = require('express')
const app = express()
const userRoutes = require('./routes/user')
// const cookieSession = require('cookie-session')
const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(cors(
  {
    origin:'http://localhost:3000',credentials:true,//access-control-allow-credentials:true optionSuccessStatus:200}
  }
))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'integratedProj2',
  resave: false,
  saveUninitialized: true
}))



const db = require('./models')

app.use('/api' , userRoutes
)
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
//   });

db.sequelize.sync({force: true}).then((res) => {
    app.listen(5000, () => {
        console.log('server is running on port 5000')
    })
})
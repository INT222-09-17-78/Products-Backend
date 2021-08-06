const express = require('express')
const app = express()
const postRoutes = require('./routes/post')



app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const db = require('./models')

app.use('/post' , postRoutes
)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

db.sequelize.sync({fource: true}).then((res) => {
    app.listen(5000, () => {
        console.log('server is running on port 5000')
    })
})
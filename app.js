const express = require('express');
const mongoose = require('mongoose')
const app = express();
require('dotenv/config')
// const bodyparser = require('body-parser')

const postRoutes  = require('./routes/post');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/post' , postRoutes
)

app.get('/', (req,res) => {
    res.send('tedst');
})

// app.get('/', (req,res) => {
//     res.send('tedst');
// })

mongoose.connect(
    process.env.DB_CONNECTION ,
    { useNewUrlParser: true ,
      useUnifiedTopology: true }, 
    
).then(() => {
    console.log('connected')
},
err  => {
    {
    console.log("Error connecting Database instance due to:", err);
    }
    }
)

app.listen(5000)
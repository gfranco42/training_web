const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 9000
const cors = require("cors");

// MIDDLEWARE
app.use(bodyParser.json())
app.use(cors());
app.use(express.json())

// ROUTES

// register and login routes
app.use('/auth', require('./routes/auth'));

// dashboard routes
app.use('/profil', require('./routes/profil'));

// images
app.use('/img', require('./routes/img'));

// users
app.use('/users', require('./routes/users'));

// youtube videos
app.use('/ytvideos', require('./routes/ytVideos'));

app.get('/', (req,res) => {
  res.json("Main page");
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
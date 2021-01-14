const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const db = require('./queries')
const pool = require('./db');
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
app.use('/dashboard', require('./routes/dashboard'));

// home lambda

app.get('/', (req,res) => {
  res.json("Main page");
})


// create

app.post('/users', async(req, res) => {
  try {
    const {firstname, pseudo, email, status} = req.body;
    const newUser = pool.query("INSERT INTO users (name, pseudo, email, status) VALUES ($1, $2, $3, $4) RETURNING", [firstname, pseudo, email, status]);
    res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// get all

app.get('/users', async(req, res) => {
  try {

    const usersList = await pool.query("SELECT * FROM users");
    res.json(usersList.rows);

  } catch (err) {
    console.error(err.message);    
  }
});


// get one

app.get('/users/:id', async(req,res) => {
  try {

    const {id} = req.params;
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(user.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
})

// update

app.put('/users/:id', async(req, res) => {
  try {

    const {id} = req.params;
    const {firstname, pseudo, email, status} = req.body;
    let updateUser;
    if (firstname !== "" && firstname !== null)
      updateUser = pool.query("UPDATE users SET name = $1 WHERE id = $2", [firstname, id]);
    if (pseudo !== "" && pseudo !== null)
      updateUser = pool.query("UPDATE users SET pseudo = $1 WHERE id = $2", [pseudo, id]);
    if (email !== "" && email !== null)
      updateUser = pool.query("UPDATE users SET email = $1 WHERE id = $2", [email, id]);
    if (status !== "" && status !== null)
      updateUser = pool.query("UPDATE users SET status = $1 WHERE id = $2", [status, id]);
    res.json(`User with id ${id} has been updated ! The new user is now => Name: ${firstname} => Pseudo: ${pseudo} => Email: ${email} => Status: ${status}`);

  } catch (error) {
    console.error(error.message);
  }
})

// delete

app.delete('/users/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const deleteUser = pool.query("DELETE FROM users WHERE id= $1", [id]);
    res.json(`User with id ${id} has been deleted !`);
    
  } catch (error) {
    console.error(error.message);
  }
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
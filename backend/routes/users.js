const router = require('express').Router();
const pool = require('../db');


// create

router.post('/', async(req, res) => {
  try {
    const {age, pseudo, email, password, status} = req.body;
    const newUser = pool.query("INSERT INTO users (age, pseudo, email, password, status) VALUES ($1, $2, $3, $4, $5)", [age, pseudo, email, password, status]);
    res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// get all

router.get('/', async(req, res) => {
  try {

    const usersList = await pool.query("SELECT * FROM users");
    res.json(usersList.rows);

  } catch (err) {
    console.error(err.message);    
  }
});


// get one

router.get('/:id', async(req,res) => {
  try {

    const {id} = req.params;
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(user.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
})

// update
router.put('/:id', async(req, res) => {
  try {

    const {id} = req.params;
    const {age, pseudo, email, status} = req.body;
    let updateUser;
    if (age !== "" && age !== null)
      updateUser = pool.query("UPDATE users SET age = $1 WHERE id = $2", [age, id]);
    if (pseudo !== "" && pseudo !== null)
      updateUser = pool.query("UPDATE users SET pseudo = $1 WHERE id = $2", [pseudo, id]);
    if (email !== "" && email !== null)
      updateUser = pool.query("UPDATE users SET email = $1 WHERE id = $2", [email, id]);
    if (status !== "" && status !== null)
      updateUser = pool.query("UPDATE users SET status = $1 WHERE id = $2", [status, id]);
    res.json(`User with id ${id} has been updated ! The new user is now => Age: ${age} => Pseudo: ${pseudo} => Email: ${email} => Status: ${status}`);

  } catch (error) {
    console.error(error.message);
  }
})

// delete
router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const deleteUser = pool.query("DELETE FROM users WHERE id= $1", [id]);
    res.json(`User with id ${id} has been deleted !`);
    
  } catch (error) {
    console.error(error.message);
  }
})

module.exports = router;
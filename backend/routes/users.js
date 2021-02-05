const router = require('express').Router();
const pool = require('../db');


// create
router.post('/', async(req, res) => {
  try {
    const {age, pseudo, email, password, status, avatar} = req.body;
    const newUser = await pool.query("INSERT INTO users (age, pseudo, email, password, status, avatar) VALUES ($1, $2, $3, $4, $5, $6)", [age, pseudo, email, password, status, "https://asylum-heroes.s3.eu-west-3.amazonaws.com/default_avatar.png"]);
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
    const {age, pseudo, email, status, avatar} = req.body;
    let updateUser;
    if (age !== "" && age !== null)
      updateUser = await pool.query("UPDATE users SET age = $1 WHERE id = $2", [age, id]);
    if (pseudo !== "" && pseudo !== null)
      updateUser = await pool.query("UPDATE users SET pseudo = $1 WHERE id = $2", [pseudo, id]);
    if (email !== "" && email !== null)
      updateUser = await pool.query("UPDATE users SET email = $1 WHERE id = $2", [email, id]);
    if (status !== "" && status !== null)
      updateUser = await pool.query("UPDATE users SET status = $1 WHERE id = $2", [status, id]);
    if (avatar !== "" && avatar !== null)
      updateUser = await pool.query("UPDATE users SET avatar = $1 WHERE id = $2", [avatar, id]);
    res.json("Modification réussi !");
  } catch (error) {
    console.error(error.message);
  }
})

// update avatar
router.post('/avatar/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {avatar} = req.body;
        const user = await pool.query("UPDATE users SET avatar = $1 WHERE id = $2", [avatar, id])
        res.json(200);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})


// delete
router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id= $1", [id]);
    res.json("Utilisateur supprimé !");
    
  } catch (error) {
    console.error(error.message);
  }
})

module.exports = router;
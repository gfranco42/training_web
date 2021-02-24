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
    let count = 0;
    
    if (age !== "" && age !== null && age && typeof age !== 'undefined')
    {
      console.log("AAA")
      updateUser = await pool.query("UPDATE users SET age = $1 WHERE id = $2", [age, id]) && count++;
    }
    if (pseudo !== "" && pseudo !== null && pseudo && typeof pseudo !== 'undefined')
    {
      console.log("BBB")
      updateUser = await pool.query("UPDATE users SET pseudo = $1 WHERE id = $2", [pseudo, id]) && count++;
    }
    if (email !== "" && email !== null && email && typeof email !== 'undefined')
    {
      console.log("CCC")
      updateUser = await pool.query("UPDATE users SET email = $1 WHERE id = $2", [email, id]) && count++;
    }
    if (status !== "" && status !== null && status && typeof status !== 'undefined')
    {
      console.log("DDD")
      updateUser = await pool.query("UPDATE users SET status = $1 WHERE id = $2", [status, id]) && count++;
    }
    if (avatar !== "" && avatar !== null && avatar && typeof avatar !== 'undefined')
    {
      console.log(avatar)
      updateUser = await pool.query("UPDATE users SET avatar = $1 WHERE id = $2", [avatar, id]) && count++;
    }
    console.log(count)
    count > 0 ? res.json(200) : res.json(201);
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
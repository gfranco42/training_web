const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

// registration
router.post('/register', validInfo, async (req, res) => {
    try {
        // 1. destructure req.body 
        const {age, pseudo, email, password} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        // 2. check if user exists (if not, throw error)
        if (user.rows.length !== 0)
            return res.status(401).json("Cet email existe déjà !");

        // 3. bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt); 

        // 4. add the user to the database
        const newUser = await pool.query("INSERT INTO users (age, pseudo, email, status, password, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [age, pseudo, email, 'common', bcryptPassword, "https://asylum-heroes.s3.eu-west-3.amazonaws.com/default_avatar.png"])

        // 5. generate jwt token
        const token = jwtGenerator(newUser.rows[0].id);
        res.json({token});
         
    } catch (error) {
       console.error(error.message); 
       res.status(500).send("Server Error")
    }
})

// login

router.post('/login', validInfo, async (req, res) => {
    try {
        // 1. destructure req.body
        const {email, password} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        // 2. check if user exists (if not, throw error)
        if (user.rows.length === 0)
            return res.status(401).json("Email ou mot de passe invalide !");

        // 3. check if incomming password matchs user (if not, throw error)
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword)
            return res.status(401).json("Email ou mot de passe invalide !");

        // 4. generate token
        const token = jwtGenerator(user.rows[0].id);
        res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

// verify

router.get('/token-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})


module.exports = router;
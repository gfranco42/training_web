const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT id, age, pseudo, email, status, avatar FROM users WHERE id = $1", [req.user])
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;
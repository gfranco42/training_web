
const router = require('express').Router();
const pool = require('../db');


//get all

router.get('/', async (req, res) => {
    try {
        const articlesList = await pool.query("SELECT * FROM articles");
        res.json(articlesList.rows);
    } catch (error) {
        console.error(error.message); 
    }
})

module.exports = router;
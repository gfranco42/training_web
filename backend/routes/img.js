const router = require('express').Router();
const pool = require('../db');


// add img
router.post('/', async(req, res) => {
    try {
      const {url} = req.body;
      const newImg = pool.query("INSERT INTO images (url) VALUES ($1)", [url]);
      res.json(newImg.rows);
    } catch (error) {
      console.error(error.message);
    }
  })

// show all imgs
router.get('/', async (req, res) => {
    try {
        const imgs = await pool.query("SELECT * FROM images");
        res.json(imgs.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// show one img
router.get('/:id', async (req, res) => {
    try {
       const {id} = req.params;
       const getImg = pool.query("SELECT * FROM images WHERE id = $id", [id]);
       res.json(getImg.rows); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// delete
router.delete('/:id', async(req, res) => {
    try {
      const {id} = req.params;
      const deleteImg = pool.query("DELETE FROM images WHERE id= $1", [id]);
      res.json(`User with id ${id} has been deleted !`);
      
    } catch (error) {
      console.error(error.message);
    }
  })


module.exports = router;
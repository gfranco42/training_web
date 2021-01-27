
const router = require('express').Router();
const pool = require('../db');


// add video
router.post('/', async(req, res) => {
    try {
      const {title, url, category, ep_nb} = req.body;
      const searchVideo = await pool.query("SELECT * FROM ytvideos WHERE url = $1", [url]);
      if (searchVideo.rows.length !== 0)
        return res.status(401).json("Cette URL existe déjà!");
      const newVideo = pool.query("INSERT INTO ytvideos (title, url, category, ep_nb) VALUES ($1, $2, $3, $4)", [title, url, category, ep_nb]);
      res.json("Ajout réussi !");
    } catch (error) {
      console.error(error.message);
    }
  })

// show all video
router.get('/', async (req, res) => {
    try {
        const video = await pool.query("SELECT * FROM ytvideos");
        res.json(video.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// show one video
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const getVideo = pool.query("SELECT * FROM ytvideos WHERE id = $id", [id]);
        res.json(getVideo.rows); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// show all videos from one category
router.get('/:category', async (req, res) => {
  try {
      const {category} = req.params;
      const getVideo = pool.query("SELECT * FROM ytvideos WHERE category = $1", [category]);
      res.json(getVideo.rows); 
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
})

// update
router.put('/:id', async(req, res) => {
    try {
  
      const {id} = req.params;
      const {title, url, category, ep_nb} = req.body;
      let updateVideo;
      const searchVideo = await pool.query("SELECT * FROM ytvideos WHERE url = $1", [url]);

      // 2. check if user exists (if not, throw error)
      console.log(searchVideo.rows[0].id)
      console.log(id)
      if (searchVideo.rows.length !== 0 && searchVideo.rows[0].id !== id)
        return res.status(401).json("Cette URL existe déjà!");

      if (title !== "" && title !== null)
        updateVideo = await pool.query("UPDATE ytvideos SET title = $1 WHERE id = $2", [title, id]);
      if (url !== "" && url !== null)
        updateVideo = await pool.query("UPDATE ytvideos SET url = $1 WHERE id = $2", [url, id]);
      if (category !== "" && category !== null)
        updateVideo = await pool.query("UPDATE ytvideos SET category = $1 WHERE id = $2", [category, id]);
      if (ep_nb !== "" && ep_nb !== null)
        updateVideo = await pool.query("UPDATE ytvideos SET ep_nb = $1 WHERE id = $2", [ep_nb, id]);
      res.json("Modification réussi !");
  
    } catch (error) {
      console.error(error.message);
    }
  })

// delete
router.delete('/:id', async(req, res) => {
    try {
      const {id} = req.params;
      const deleteVideo = pool.query("DELETE FROM ytvideos WHERE id= $1", [id]);
      res.json(`ytVideo with id ${id} has been deleted !`);
      
    } catch (error) {
      console.error(error.message);
    }
  })


module.exports = router;
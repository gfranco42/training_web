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

// create
router.post('/', async(req, res) => {
  try {
    const {title, image, description, text_content, img_content, video_content} = req.body;
    const newArticle = await pool.query("INSERT INTO articles (title, image, description, text_content, img_content, video_content) VALUES ($1, $2, $3, $4, $5, $6)",
    [title, image, description, text_content, img_content, video_content]);
    res.json(200);
  } catch (error) {
    console.error(error.message);
  }
})

// get one
router.get('/:id', async(req,res) => {
  try {

    const {id} = req.params;
    const article = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    res.json(article.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
})

// update
router.put('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const {title, image, description, text_content, img_content, video_content} = req.body;
    let updateArticle;
    if (title !== "" && title !== null)
      updateArticle = await pool.query("UPDATE articles SET title = $1 WHERE id = $2", [title, id]);
    if (image !== "" && image !== null)
      updateArticle = await pool.query("UPDATE articles SET image = $1 WHERE id = $2", [image, id]);
    if (description !== "" && description !== null)
      updateArticle = await pool.query("UPDATE articles SET description = $1 WHERE id = $2", [description, id]);
    if (text_content !== "" && text_content !== null)
      updateArticle = await pool.query("UPDATE articles SET text_content = $1 WHERE id = $2", [text_content, id]);
    if (img_content !== "" && img_content !== null)
      updateArticle = await pool.query("UPDATE articles SET img_content = $1 WHERE id = $2", [img_content, id]);
    if (video_content !== "" && video_content !== null)
      updateArticle = await pool.query("UPDATE articles SET video_content = $1 WHERE id = $2", [video_content, id]);
    res.json(200);
  } catch (error) {
    console.error(error.message);
  }
})

// delete
router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const deleteArticle = pool.query("DELETE FROM articles WHERE id = $1", [id]);
    res.json(200);
    
  } catch (error) {
    console.error(error.message);
  }
})

module.exports = router;
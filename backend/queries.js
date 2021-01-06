const Pool = require('pg').Pool
const pool = new Pool({
  user: 'greatjack',
  host: 'localhost',
  database: 'asylumheroes',
  password: 'asylumheroes',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
  /* modifier les accolades */
  const { name, pseudo, email, status } = request.body
  
  /* modifier la ligne verte et les crochets */
  pool.query('INSERT INTO users (name, pseudo, email, status) VALUES ($1, $2, $3, $4)', [name, pseudo, email, status], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results}`)
  })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, pseudo, email, status } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, pseudo = $2, email = $3, status = $4 WHERE id = $5',
      [name, pseudo, email, status],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
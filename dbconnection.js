const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
})


const getUsers = (request, response) => {
  pool.query('SELECT * FROM contact', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM contact WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name,age,fav } = request.body

  pool.query('INSERT INTO contact (name,age,fav) VALUES ($1, $2,$3)', [name,age,fav], (error,results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`contact added with ID: ${results.insertId}`)
  })
}

const resetUser = (request, response) => {
  console.log("error");
  const { fav } = request.body 
  pool.query(
    'UPDATE contact SET fav = $1 where fav ' ,
    [fav],
    (error, results) => {
      if (error) {
        throw error
      }
     
      response.status(200).send(`reset completed`)
    }
  )
}



const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name,age,fav } = request.body

  pool.query(
    'UPDATE contact SET name = $1, age = $2 , fav = $3 WHERE id = $4',
    [name, age,fav, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`contact modified with ID: ${results.id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM contact WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`contact deleted with ID: ${results.id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  resetUser,
}
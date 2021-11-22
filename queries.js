const { pool } = require('./config')

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCams = (request, response) => {
    pool.query('SELECT * FROM cams ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getIncidents = (request, response) => {
  pool.query('SELECT * FROM incidents ORDER BY id DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLastIncident = (request, response) => {
  pool.query('SELECT * FROM incidents ORDER BY id DESC LIMIT 1', (error, results) => {
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

const getCamById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM cams WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getIncidentById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM incidents WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const {firstname, lastname, email, username, password} = request.body

  pool.query('INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, username, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const createCam = (request, response) => {
    const { name, url } = request.body
  
    pool.query('INSERT INTO cams (name, url) VALUES ($1, $2)', [name, url], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Cam added with ID: ${results}`)
    })
}

const createIncident = (request, response) => {
  const { priority, description } = request.body  

  pool.query('INSERT INTO incidents (Priority_ID, TT_Description) VALUES ($1, $2)', [priority, description], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Incident added with ID: ${results}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
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

const login = (request, response) => {
  
  const username = request.body.username;
  const password = request.body.password;

  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }

    let users = results.rows;
    let valid = false;

    for (let i = 0; i < users.length; i++){
      if((username == users[i].username)  && (password == users[i].password)) {
        valid = true
        index = i
        break;
      }
    }

    let result = {};

    if (valid) {
      result = {
        "loggedIn" : true
      };
      response.status(200).json(result);
    } else {
      result = {
        "loggedIn" : false
      };
      response.status(200).json(result);
    }

  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCams,
  getCamById,
  createCam,
  getIncidents,
  getIncidentById,
  createIncident,
  getLastIncident,
  login,
}

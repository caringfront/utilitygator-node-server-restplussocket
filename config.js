require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

//const connectionString = ``
const connectionString = ``

const pool = new Pool({
    connectionString:connectionString,
    ssl: { rejectUnauthorized: false }
  })
  

module.exports = { pool }
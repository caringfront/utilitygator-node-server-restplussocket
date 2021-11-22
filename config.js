require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

//const connectionString = ``

const connectionString = ``

const pool = new Pool({
  connectionString:connectionString,
  ssl: { rejectUnauthorized: false }
})

/* const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
}) */

module.exports = { pool }
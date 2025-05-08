import mysql from 'mysql'


const database = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database:  process.env.DB_NAME
  })
export default database;


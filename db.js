// Legacy MySQL connection helper.
// Keep credentials in environment variables instead of hardcoding them here.
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rpv_db'
});

db.connect((err) => {
  if (err) {
    console.log('Database Error');
  } else {
    console.log('MySQL Connected');
  }
});

module.exports = db;

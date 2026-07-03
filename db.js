const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Neww_ic95559',
    database: 'rpv_db'
});

db.connect((err) => {
    if(err){
        console.log('Database Error');
    } else {
        console.log('MySQL Connected');
    }
});

module.exports = db;
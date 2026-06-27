const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmate'
});

db.connect((err) => {
    if (err) {
        console.log('Koneksi gagal:', err);
    } else {
        console.log('Database terhubung');
    }
});

module.exports = db;
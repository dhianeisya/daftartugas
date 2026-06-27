const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = process.env.DATABASE_URL || {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'taskmate',
    port: process.env.DB_PORT || 3306
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.log('Koneksi gagal:', err);
    } else {
        console.log('Database terhubung');
    }
});

module.exports = db;
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, '../ca-cert.pem')),
        rejectUnauthorized: true
    }
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ LỖI KẾT NỐI:', err.message);
    } else {
        console.log('✅ KẾT NỐI THÀNH CÔNG!');
        connection.release();
    }
});

module.exports = pool.promise();
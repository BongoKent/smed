const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'Mateusz',
    password: '1234',
    database: 'TIN'
});

module.exports = pool;
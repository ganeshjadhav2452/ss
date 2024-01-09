const mysql = require('mysql2');
const dbConfig = require('../config/dbConfig')

const connectDb = () => {
    const pool = mysql.createPool(dbConfig);
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }

        try {
            if (connection) {
                connection.release();
                console.log('Database connected successfully');
            } else {
                console.error('No valid connection object');
            }
        } catch (releaseErr) {
            return console.error('Error releasing connection:', releaseErr);
        }
    });

    return pool
}

module.exports = connectDb();
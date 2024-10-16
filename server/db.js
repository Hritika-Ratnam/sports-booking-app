// db.js
const mysql = require('mysql2');

// Database connection details
const con = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12738211',
    password: 'SJH7wNITDd',
    database: 'sql12738211'
});

// Connect to the database
con.connect(function (error) {
    if (error) {
        console.error("Error connecting to the database: ", error.message);
        console.log("Database connection failed");
    } else {
        console.log("Database connected successfully");
    }
});

module.exports = con;
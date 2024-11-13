const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
});

db.connect(error => {
    if (error) {
        console.error(error);
    } else {
        console.log("MySQL connected.");
    }
});

module.exports = db;
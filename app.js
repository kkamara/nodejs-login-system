const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require("path");

const parseEnvFile = dotenv.config({
    path: path.join(__dirname, '.env'),
});

if (parseEnvFile.error) {
    throw parseEnvFile.error;
}

const app = express();

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

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
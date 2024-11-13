const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require("node:path");

const pages = require("./routes/pages");
const auth = require("./routes/auth");

const parseEnvFile = dotenv.config({
    path: path.join(__dirname, ".env"),
});

if (parseEnvFile.error) {
    throw parseEnvFile.error;
}

const app = express();

const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));

// Parse URL encoded bodies (as sent by HTML forms).
app.use(express.urlencoded({ extended: false, }));
app.use(express.json());

app.set("view engine", "hbs");

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

// Define routes
app.use("/", pages);
app.use("/auth", auth);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
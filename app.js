const express = require("express");
const path = require("node:path");
const utils = require("./utils");
const db = require("./database");

const pages = require("./routes/pages");
const auth = require("./routes/auth");

const app = express();

const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));

// Parse URL encoded bodies (as sent by HTML forms).
app.use(express.urlencoded({ extended: false, }));
app.use(express.json());

app.set("view engine", "hbs");

// Define routes
app.use("/", pages);
app.use("/auth", auth);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
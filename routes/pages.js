const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    return res.render("index");
});

router.get("/register", (req, res) => {
    return res.render("register");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/",  authController.isLoggedIn, (req, res) => {
    return res.render("index", { user: req.user, });
});

router.get("/register", (req, res) => {
    return res.render("register");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.get("/profile", authController.isLoggedIn, (req, res) => {
    if (req.user) {
        return res.render("profile", { user: req.user, });
    } else {
        return res.redirect("/login");
    }
});

module.exports = router;
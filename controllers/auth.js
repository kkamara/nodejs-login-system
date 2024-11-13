const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    console.log(req.body);
    const {
        name,
        email,
        password,
        passwordConfirm,
    } = req.body;

    db.query(
        "SELECT email FROM users WHERE email = ?",
        [email,],
        async (error, results) => {
            if (error) {
                console.error(error);
                return;
            }
            if (results.length > 0) {
                return res.render(
                    "register",
                    {
                        message: "That email is already in use.",
                    },
                );
            } else if (password !== passwordConfirm) {
                return res.render(
                    "register",
                    {
                        message: "Passwords do not match.",
                    },
                );
            }

            const hashedPassword = await bcrypt.hash(password, 8);

            db.query(
                "INSERT INTO users SET ?",
                {
                    password: hashedPassword,
                    name,
                    email,
                },
                (error, results) => {
                    if (error) {
                        console.error(error);
                        return;
                    } else {
                        if (process.env.NODE_ENV !== "production") {
                            console.log(results);
                        }
                        return res.render(
                            "register",
                            {
                                message: "User registered.",
                            },
                        );
                    }
                }
            );
        },
    );
};
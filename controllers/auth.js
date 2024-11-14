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

exports.login = async (req, res) => {
    try {
        const { email, password, } = req.body;

        if (!email || !password) {
            return res.status(400)
                .render("login", { message: "Please provide an email and password.", });
        }

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email,],
            async (error, results) => {
                if (!results || !(await bcrypt.compare(password, results[0].password))) {
                    return res.status(401).render("login", { message: "Email or password is incorrect.", });
                } else {
                    const id = results[0].id;

                    const token = jwt.sign(
                        { id, },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRES_IN, }
                    );

                    if (process.env.NODE_ENV !== "production") {
                        console.log("The token is: "+token);
                    }

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true,
                    };

                    res.cookie("jwt", token, cookieOptions);
                    return res.status(200).redirect("/");
                }
            },
        );
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(error);
        }
    }
};
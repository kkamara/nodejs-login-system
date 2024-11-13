exports.register = (req, res) => {
    console.log(req.body);
    return res.send("Form submitted.");
};
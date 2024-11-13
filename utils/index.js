const dotenv = require('dotenv');
const path = require("node:path");

const parseEnvFile = dotenv.config({
    path: path.join(
        __dirname,
        "..",
        ".env",
    ),
});

if (parseEnvFile.error) {
    throw parseEnvFile.error;
}

module.exports = {};
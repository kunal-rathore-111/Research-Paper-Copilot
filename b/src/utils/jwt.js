const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

function createToken(userId) {
    return jwt.sign({ userId }, jwt_secret, { expiresIn: '7d' });
}

function decodeToken(token) {
    return jwt.verify(token, jwt_secret);
}

module.exports = { createToken, decodeToken }
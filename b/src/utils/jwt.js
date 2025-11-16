

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

function createToken(userId) {
    return jwt.sign({ userId: userId }, jwt_secret, { expiresIn: 7 * 1000 * 60 * 60 * 24 }); // 7days expiry
}

function decodeToken(token) {
    return jwt.verify(token, jwt_secret);
}

module.exports = { createToken, decodeToken }
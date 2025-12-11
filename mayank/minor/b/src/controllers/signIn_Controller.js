// db functions
const userService = require("../services/userService");

// tokenCreation
const { createToken } = require("../utils/jwt");

//signIn
const signin = async (req, res) => {

    const userId = await userService.isUserExists(req.body);

    // jwt generation
    const token = createToken(userId);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ message: "Sign-in successfull" });

    // after signIn redirect to the home from fronted not here
}

const respondTokenExists = (req, res) => {
    const userId = req.userId
    res.json({ message: "Token exists", userId: userId }) // need to change to true or may be route will be removed later 
}

module.exports = { signin, respondTokenExists };
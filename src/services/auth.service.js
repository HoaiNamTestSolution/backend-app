const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
const User = require("../models/user.model");

const register = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword
    });

    return user;
};

const login = async (username, password) => {
    const user = await User.findOne({ username });

    if(!user)
        throw new Error ("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
        throw new Error ("Wrong password");

    const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role},
        process.env.JWT_SECRET || "secretkey",
        {
            expiresIn: "1h"
        }
    );

    return token;
};

module.exports = {
    register, login
};
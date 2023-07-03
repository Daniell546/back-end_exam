const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const {SECRET} = require('../config/config');

exports.login = async (email, password) => {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error('Invalid user or password');
    };

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error('Invalid user or password');
    }

    const token = await generateToken(user);

    return token;
};


exports.register = async (userData) => {
    const user = await User.findOne({username: userData.email});

    if(user) {
        throw new Error('Email already exist');
    }
    
    const createdUser = await User.create(userData);

    const token = await generateToken(createdUser);
    return token
};


async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d'});

    return token;
}
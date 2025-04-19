const jwt = require('jsonwebtoken')
require('dotenv').config();

function tokenMaker(user){
    const {username, id, role } = user;
    const token = jwt.sign({ username, id, role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { tokenMaker };
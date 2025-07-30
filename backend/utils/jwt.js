const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = { generateToken };

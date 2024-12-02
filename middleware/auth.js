const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Middleware to check if JWT is valid
function authenticate(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = authenticate;

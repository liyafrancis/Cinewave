// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, 'your_jwt_secret', async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;

    // Fetch user from the database
    const dbUser = await User.findById(user.id);
    if (!dbUser) return res.status(404).json({ message: 'User not found' });

    // Add user role to request object
    req.user.role = dbUser.role;

    next();
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };

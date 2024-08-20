const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    // Fetch user from User or Admin collection
    let dbUser = await User.findById(decoded.id);
    if (!dbUser) {
      dbUser = await Admin.findById(decoded.id);
    }

    if (!dbUser) return res.status(404).json({ message: 'User not found' });

    req.user = dbUser;
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

// controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Login function for both User and Admin
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      // If user is not found in User collection, try Admin collection
      user = await Admin.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role || 'admin' }, // Set role to 'admin' if it's an Admin
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role || 'admin' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login };

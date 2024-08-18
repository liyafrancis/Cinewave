// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password,email,role } = req.body;
  
  if (role === 'admin') {
    try {
      const admin = new Admin({ username, password, email });
      await admin.save();
      res.status(201).json({ message: 'Admin registered' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    try {
      const user = new User({ username, password, email, role });
      await user.save();
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  
});

// Login and get token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');

const { login } = require('../controllers/authController');
// Register a new user
router.post('/register', async (req, res) => {
  console.log('Register endpoint hit');
  const { username, password,email,role } = req.body;
  console.log(`Received data: ${username}, ${email}, ${role}`);
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
router.post('/login', login);



module.exports = router;

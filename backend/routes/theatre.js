const express = require('express');
const router = express.Router();
const Theatre = require('../models/Theatre');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Get all theatres
router.get('/', authenticateToken, async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific theatre by name
router.get('/name/:name', authenticateToken, async (req, res) => {
  try {
    const theatre = await Theatre.findOne({ name: req.params.name });
    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }
    res.json(theatre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new theatre
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const theatre = new Theatre({
    name: req.body.name,
    rows: req.body.rows,
    columns: req.body.columns,
    district: req.body.district,
  });

  try {
    const newTheatre = await theatre.save();
    res.status(201).json(newTheatre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a theatre
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTheatre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a theatre
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.params.id);
    res.json({ message: 'Theatre deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

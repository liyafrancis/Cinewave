// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Get all movies
router.get('/', authenticateToken, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new movie
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    genres: req.body.genres,
    imgSrc: req.body.imgSrc,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a movie
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a movie
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

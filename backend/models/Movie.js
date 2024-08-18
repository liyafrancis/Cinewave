// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genres: [{ type: String }],
  imgSrc: { type: String, required: true },
});

module.exports = mongoose.model('Movie', movieSchema);

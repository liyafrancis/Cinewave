// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cinewave', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const theatreRoutes = require('./routes/theatre');
app.use('/api/theatre',theatreRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});

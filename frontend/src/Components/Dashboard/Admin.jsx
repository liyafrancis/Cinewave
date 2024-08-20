import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState({
    title: '',
    genres: '',
    imgSrc: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editMovieId, setEditMovieId] = useState(null);

  // Fetch movies from the backend on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/movies', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setMovies(data);
  };

  const handleAddOrUpdateMovie = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `http://localhost:5000/api/movies/${editMovieId}` : 'http://localhost:5000/api/movies';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(movieData)
    });

    if (response.ok) {
      fetchMovies(); // Refresh movie list
      setMovieData({ title: '', genres: '', imgSrc: '', description: '' });
      setIsEditing(false);
    } else {
      console.error('Failed to save movie');
    }
  };

  const handleEdit = (movie) => {
    setMovieData(movie);
    setIsEditing(true);
    setEditMovieId(movie._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      fetchMovies(); // Refresh movie list
    } else {
      console.error('Failed to delete movie');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Movie List */}
      <div className="movie-list">
        <h2>Movies</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <div className="movie-item">
                <img src={movie.imgSrc} alt={movie.title} />
                <div>
                  <h3>{movie.title}</h3>
                  <p>{movie.description}</p>
                  <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                  <button onClick={() => handleEdit(movie)}>Edit</button>
                  <button onClick={() => handleDelete(movie._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Add or Edit Movie Form */}
      <div className="movie-form">
        <h2>{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
        <form onSubmit={handleAddOrUpdateMovie}>
          <input
            type="text"
            value={movieData.title}
            onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
            placeholder="Movie Title"
            required
          />
          <input
            type="text"
            value={movieData.genres}
            onChange={(e) => setMovieData({ ...movieData, genres: e.target.value.split(',').map(g => g.trim()) })}
            placeholder="Genres (comma separated)"
          />
          <input
            type="text"
            value={movieData.imgSrc}
            onChange={(e) => setMovieData({ ...movieData, imgSrc: e.target.value })}
            placeholder="Image URL"
            required
          />
          <textarea
            value={movieData.description}
            onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
            placeholder="Movie Description"
            required
          />
          <button type="submit">{isEditing ? 'Update Movie' : 'Add Movie'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;

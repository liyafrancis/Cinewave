import React, { useState, useEffect } from 'react';
import './theatre.css';

const Theatre = () => {
  const [formData, setFormData] = useState({
    name: '',
    rows: '',
    columns: '',
    district: ''
  });
  const [theatres, setTheatres] = useState([]);
  const [editingTheatre, setEditingTheatre] = useState(null);
  
  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/theatre', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you have a token in localStorage
      }
    });
    const data = await response.json();
    setTheatres(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingTheatre ? 'PUT' : 'POST';
    const url = editingTheatre
      ? `http://127.0.0.1:5000/api/theatre/${editingTheatre._id}`
      : 'http://127.0.0.1:5000/api/theatre';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      fetchTheatres(); // Refresh the list
      setFormData({ name: '', rows: '', columns: '', district: '' }); // Clear the form
      setEditingTheatre(null); // Reset editing state
    } else {
      console.error('Failed to save theatre');
    }
  };

  const handleEdit = (theatre) => {
    setFormData(theatre);
    setEditingTheatre(theatre);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/api/theatre/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      fetchTheatres(); // Refresh the list
    } else {
      console.error('Failed to delete theatre');
    }
  };

  return (
    <div className="theatre-container">
      <div className="form-section">
        <h1>{editingTheatre ? 'Edit Theatre' : 'Add New Theatre'}</h1>
        <form className="theatre-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Theatre Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rows"
            placeholder="Number of Rows"
            value={formData.rows}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="columns"
            placeholder="Number of Columns"
            value={formData.columns}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            required
          />
          <button type="submit">{editingTheatre ? 'Update Theatre' : 'Add Theatre'}</button>
        </form>
      </div>

      <div className="table-section">
        <h2>Theatre List</h2>
        <table className="theatre-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rows</th>
              <th>Columns</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {theatres.map((theatre) => (
              <tr key={theatre._id}>
                <td>{theatre.name}</td>
                <td>{theatre.rows}</td>
                <td>{theatre.columns}</td>
                <td>{theatre.district}</td>
                <td>
                  <button onClick={() => handleEdit(theatre)}>Edit</button>
                  <button onClick={() => handleDelete(theatre._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Theatre;

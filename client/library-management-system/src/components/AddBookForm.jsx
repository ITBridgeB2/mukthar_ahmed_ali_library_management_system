import React, { useState } from 'react';
import './AddBookForm.css';
import { addBook } from '../services/api';

export default function AddBookForm({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    genre: '',
    publication_year: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(formData);
    onAdd(); // Refresh list
    onClose(); // Close modal
  };

  return (
    <div className="add-book-form-container">
      <form className="add-book-form" onSubmit={handleSubmit}>
        <h2>Add New Book</h2>

        <label>Title</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Author</label>
        <input name="author" value={formData.author} onChange={handleChange} required />

        <label>Genre</label>
        <input name="genre" value={formData.genre} onChange={handleChange} required />

        <label>Publication Year</label>
        <input
          name="publication_year"
          type="number"
          value={formData.publication_year}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="btn save">Add Book</button>
          <button type="button" className="btn cancel" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

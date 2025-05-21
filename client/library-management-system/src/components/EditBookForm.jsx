import React, { useState } from 'react';
import './EditBookForm.css';
import { updateBook } from '../services/api';

export default function EditBookForm({ book, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    title: book.name,
    author: book.author,
    genre: book.genre,
    publication_year: book.publication_year,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBook(book.id, formData);
    onSave(); // Call parent handler to refresh + close modal
  };

  return (
    <form className="edit-book-form" onSubmit={handleSubmit}>
      <h3>Edit Book</h3>

      <label>Title</label>
      <input type="text" name="title" value={formData.name} onChange={handleChange} required />

      <label>Author</label>
      <input type="text" name="author" value={formData.author} onChange={handleChange} required />

      <label>Genre</label>
      <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />

      <label>Publication Year</label>
      <input
        type="number"
        name="publication_year"
        value={formData.publication_year}
        onChange={handleChange}
        required
      />

      <div className="edit-form-actions">
        <button type="submit" className="btn save">Save</button>
        <button type="button" className="btn cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

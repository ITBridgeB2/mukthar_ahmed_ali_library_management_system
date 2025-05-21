import React, { useState } from 'react';
import './BookDetailModal.css';
import EditBookForm from './EditBookForm';
import { deleteBook } from '../services/api';

export default function BookDetailModal({ book, onClose, onBookUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    await deleteBook(book.id);
    onBookUpdated(); // Refresh book list
    onClose();       // Close modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!isEditing ? (
          <>
            <button className="modal-close" onClick={onClose}>✖</button>
            <h2>{book.name}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Publication Year:</strong> {book.publication_year}</p>
            <p><strong>Added On:</strong> {new Date(book.added_on).toLocaleString()}</p>

            <div className="modal-actions">
              <button className="btn edit" onClick={() => setIsEditing(true)}>Edit</button>
              {!confirmDelete ? (
                <button className="btn delete" onClick={() => setConfirmDelete(true)}>Delete</button>
              ) : (
                <div className="confirm-delete">
                  <span>Confirm delete?</span>
                  <button className="btn confirm" onClick={handleDelete}>Yes</button>
                  <button className="btn cancel" onClick={() => setConfirmDelete(false)}>No</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <EditBookForm
            book={book}
            onCancel={() => setIsEditing(false)}
            onSave={() => {
              setIsEditing(false);
              onBookUpdated();
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}

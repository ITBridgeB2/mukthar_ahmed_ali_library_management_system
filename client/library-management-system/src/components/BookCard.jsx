import React from 'react';
import './BookCard.css';

export default function BookCard({ book, onClick }) {
  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <div className="book-title">{book.name}</div>
      <div className="book-author">by {book.author}</div>
      <div className="book-genre">{book.genre}</div>
      <div className="book-year">{book.publication_year}</div>
    </div>
  );
}

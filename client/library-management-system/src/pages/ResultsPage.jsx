import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import { getAllBooks } from '../services/api';
import './ResultsPage.css';

export default function ResultsPage() {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // <-- for modal
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query')?.toLowerCase() || '';

  const fetchBooks = async () => {
    try {
      const response = await getAllBooks();
      const allBooks = response.data || [];

      const filtered = allBooks.filter((book) => {
        const title = book.name?.toLowerCase() || '';
        const author = book.author?.toLowerCase() || '';
        return title.includes(query) || author.includes(query);
      });

      setFilteredBooks(filtered);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

 useEffect(() => {
  const fetchAndFilterBooks = async () => {
    try {
      const response = await getAllBooks();
      const allBooks = response.data || [];

      const filtered = allBooks.filter((book) => {
        const title = book.name?.toLowerCase() || '';
        const author = book.author?.toLowerCase() || '';
        return title.includes(query) || author.includes(query);
      });

      setFilteredBooks(filtered);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  fetchAndFilterBooks();
}, [query]);


  return (
    <div className="results-page">
      <h2>Search Results for "{query}"</h2>
      <div className="results-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onClick={setSelectedBook} />
          ))
        ) : (
          <p className="no-results">No books found.</p>
        )}
      </div>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onBookUpdated={fetchBooks}
        />
      )}
    </div>
  );
}

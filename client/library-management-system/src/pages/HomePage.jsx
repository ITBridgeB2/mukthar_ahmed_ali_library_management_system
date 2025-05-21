import React, { useState, useEffect } from 'react';

import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import AddBookForm from '../components/AddBookForm';
import { getAllBooks } from '../services/api';
import './HomePage.css';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
  try {
    const response = await getAllBooks();   // get full Axios response
    const books = response.data;            // extract actual array
    if (Array.isArray(books)) {
      setBooks(books);
      setFilteredBooks(books);
    } else {
      console.error("Fetched data is not an array:", books);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};



  const handleSearch = (query) => {
  const filtered = books.filter((book) => {
    const title = book.name || '';
    const author = book.author || '';
    const lowerQuery = query.toLowerCase();

    return (
      title.toLowerCase().includes(lowerQuery) ||
      author.toLowerCase().includes(lowerQuery)
    );
  });

  setFilteredBooks(filtered);
};


  const handleFilter = (type, value) => {
    const result = books.filter(book =>
      type === 'genre' ? book.genre === value : book.author === value
    );
    setFilteredBooks(result);
  };

  return (
    <div className="homepage">
      
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter
        genres={[...new Set(books.map(b => b.genre))]}
        authors={[...new Set(books.map(b => b.author))]}
        onSelect={handleFilter}
      />

      <section className="section">
        <h3>Books</h3>
        <div className="book-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} onClick={setSelectedBook} />
          ))}
        </div>
      </section>

      {showAddForm && <AddBookForm onClose={() => setShowAddForm(false)} onBookAdded={fetchBooks} />}
      {selectedBook && <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} onBookUpdated={fetchBooks} />}
    </div>
  );
}

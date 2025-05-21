import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import AddBookForm from './components/AddBookForm';
import { getAllBooks } from './services/api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchBooks = async () => {
    const res = await getAllBooks();
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Router>
      <Navbar onAddClick={() => setShowAddForm(true)} />
      {showAddForm && (
        <div className="modal-backdrop">
          <AddBookForm onClose={() => setShowAddForm(false)} onAdd={fetchBooks} />
        </div>
      )}
      <Routes>
        <Route path="/" element={<HomePage books={books} />} />
        <Route path="/results" element={<ResultsPage books={books} />} />
      </Routes>
    </Router>
  );
}

export default App;

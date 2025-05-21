import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/books',
});

// 📚 Get all books
export const getAllBooks = () => API.get('/');

// 🔍 Search books by title, author, or genre
export const searchBooks = ({ name, author, genre }) => {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (author) params.append('author', author);
  if (genre) params.append('genre', genre);
  return API.get(`/search?${params.toString()}`);
};

// 🆕 Add a new book
export const addBook = (bookData) => API.post('/add', bookData);

// ✏️ Update book by ID
export const updateBook = (id, updatedData) => API.put(`/${id}`, updatedData);

// ❌ Delete book by ID
export const deleteBook = (id) => API.delete(`/${id}`);

// 📂 Get books by author or genre (category filter)
export const getBooksByAuthor = (authorName) =>
  API.get(`/author/${encodeURIComponent(authorName)}`);

export const getBooksByGenre = (genre) =>
  API.get(`/genre/${encodeURIComponent(genre)}`);

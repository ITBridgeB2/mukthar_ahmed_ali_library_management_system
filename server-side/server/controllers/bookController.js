const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const { search, author, genre } = req.query;
    const books = await Book.getBooks({ search, author, genre });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (book) res.json(book);
    else res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const result = await Book.addBook(req.body);
    res.status(201).json({ message: 'Book added', id: result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    await Book.updateBook(req.params.id, req.body);
    res.json({ message: 'Book updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.deleteBook(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeaturedBooks = async (req, res) => {
  try {
    const books = await Book.getFeaturedBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

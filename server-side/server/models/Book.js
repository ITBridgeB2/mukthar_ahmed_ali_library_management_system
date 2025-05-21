const db = require('./db');

// Get all books or filter by search, author, genre
function getBooks({ search, author, genre }) {
  let sql = 'SELECT * FROM books WHERE 1';
  let params = [];

  if (search) {
    sql += ' AND (name LIKE ? OR author LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  if (author) {
    sql += ' AND author = ?';
    params.push(author);
  }
  if (genre) {
    sql += ' AND genre = ?';
    params.push(genre);
  }

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

function getBookById(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
}

function addBook(book) {
  const { name, author, genre, publication_year } = book;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO books (name, author, genre, publication_year) VALUES (?, ?, ?, ?)',
      [name, author, genre, publication_year],
      (err, result) => {
        if (err) reject(err);
        else resolve({ id: result.insertId });
      }
    );
  });
}

function updateBook(id, book) {
  const { name, author, genre, publication_year } = book;
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE books SET name = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?',
      [name, author, genre, publication_year, id],
      (err) => {
        if (err) reject(err);
        else resolve({ message: 'Updated' });
      }
    );
  });
}

function deleteBook(id) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM books WHERE id = ?', [id], (err) => {
      if (err) reject(err);
      else resolve({ message: 'Deleted' });
    });
  });
}

function getFeaturedBooks() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM books ORDER BY added_on DESC LIMIT 10',
      [],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
}

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  getFeaturedBooks,
};

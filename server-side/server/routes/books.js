const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.get('/featured', bookController.getFeaturedBooks);
router.get('/:id', bookController.getBookById);
router.post('/add', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;

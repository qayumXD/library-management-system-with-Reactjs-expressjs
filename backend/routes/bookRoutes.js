const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Protected routes
router.post('/', authenticate, authorizeRole(['admin', 'librarian']), bookController.createBook);
router.put('/:id', authenticate, authorizeRole(['admin', 'librarian']), bookController.updateBook);
router.delete('/:id', authenticate, authorizeRole(['admin']), bookController.deleteBook);

module.exports = router;
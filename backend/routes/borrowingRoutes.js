const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

// All these routes require authentication
router.use(authenticate);

router.post('/', borrowingController.borrowBook);
router.put('/:id/return', borrowingController.returnBook);
router.get('/user/:userId', borrowingController.getUserBorrowings);

// Admin/librarian routes
router.get('/', authorizeRole(['admin', 'librarian']), borrowingController.getAllBorrowings);
router.get('/:id', authorizeRole(['admin', 'librarian']), borrowingController.getBorrowingById);

module.exports = router;
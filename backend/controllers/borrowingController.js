const Borrowing = require('../models/borrowingModel');

exports.borrowBook = async (req, res) => {
  try {
    const { user_id, book_id, due_date } = req.body;
    
    const borrowId = await Borrowing.create({
      user_id,
      book_id,
      due_date
    });
    
    res.status(201).json({ 
      message: 'Book borrowed successfully',
      borrowId
    });
    
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: error.message || 'Error borrowing book' });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const borrowId = req.params.id;
    
    const returned = await Borrowing.returnBook(borrowId);
    if (returned) {
      res.status(200).json({ message: 'Book returned successfully' });
    } else {
      res.status(400).json({ message: 'Failed to return book' });
    }
    
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: error.message || 'Error returning book' });
  }
};

exports.getUserBorrowings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const borrowings = await Borrowing.getUserBorrowings(userId);
    
    res.status(200).json(borrowings);
  } catch (error) {
    console.error('Error fetching user borrowings:', error);
    res.status(500).json({ message: 'Error fetching borrowings' });
  }
};

exports.getAllBorrowings = async (req, res) => {
  try {
    const borrowings = await Borrowing.getAll();
    res.status(200).json(borrowings);
  } catch (error) {
    console.error('Error fetching all borrowings:', error);
    res.status(500).json({ message: 'Error fetching borrowings' });
  }
};

exports.getBorrowingById = async (req, res) => {
  try {
    const borrowId = req.params.id;
    const borrowing = await Borrowing.findById(borrowId);
    
    if (!borrowing) {
      return res.status(404).json({ message: 'Borrowing record not found' });
    }
    
    res.status(200).json(borrowing);
  } catch (error) {
    console.error('Error fetching borrowing:', error);
    res.status(500).json({ message: 'Error fetching borrowing' });
  }
};
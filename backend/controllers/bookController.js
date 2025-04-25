const Book = require('../models/bookModel');

exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;
    
    // Check if book with ISBN already exists
    const existingBook = await Book.findByIsbn(bookData.isbn);
    if (existingBook) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }
    
    const bookId = await Book.create(bookData);
    res.status(201).json({ 
      message: 'Book created successfully',
      bookId
    });
    
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Error creating book' });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Error fetching book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookData = req.body;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // If ISBN is changed, check if it conflicts with another book
    if (bookData.isbn !== book.isbn) {
      const existingBook = await Book.findByIsbn(bookData.isbn);
      if (existingBook && existingBook.id !== parseInt(bookId)) {
        return res.status(400).json({ message: 'Book with this ISBN already exists' });
      }
    }
    
    const updated = await Book.update(bookId, bookData);
    if (updated) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update book' });
    }
    
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    const deleted = await Book.delete(bookId);
    if (deleted) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete book' });
    }
    
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book' });
  }
};
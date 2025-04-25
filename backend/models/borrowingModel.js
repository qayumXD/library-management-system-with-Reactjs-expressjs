const db = require('../config/db');

const Borrowing = {
  create: async (borrowData) => {
    const { user_id, book_id, due_date } = borrowData;
    
    // Begin transaction
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      
      // Check if book is available
      const [bookRows] = await connection.execute('SELECT available_copies FROM books WHERE id = ?', [book_id]);
      if (!bookRows[0] || bookRows[0].available_copies <= 0) {
        throw new Error('Book not available for borrowing');
      }
      
      // Create borrowing record
      const [borrowResult] = await connection.execute(
        'INSERT INTO borrowings (user_id, book_id, due_date) VALUES (?, ?, ?)',
        [user_id, book_id, due_date]
      );
      
      // Update book available copies
      await connection.execute(
        'UPDATE books SET available_copies = available_copies - 1 WHERE id = ?',
        [book_id]
      );
      
      await connection.commit();
      return borrowResult.insertId;
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  
  returnBook: async (borrowId) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      
      // Get borrowing record and book id
      const [borrowRows] = await connection.execute(
        'SELECT book_id FROM borrowings WHERE id = ? AND return_date IS NULL',
        [borrowId]
      );
      
      if (!borrowRows[0]) {
        throw new Error('Borrowing record not found or book already returned');
      }
      
      const book_id = borrowRows[0].book_id;
      
      // Update borrowing record
      await connection.execute(
        'UPDATE borrowings SET return_date = CURRENT_TIMESTAMP, status = "returned" WHERE id = ?',
        [borrowId]
      );
      
      // Update book available copies
      await connection.execute(
        'UPDATE books SET available_copies = available_copies + 1 WHERE id = ?',
        [book_id]
      );
      
      await connection.commit();
      return true;
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  
  getUserBorrowings: async (userId) => {
    const [rows] = await db.execute(
      `SELECT b.*, books.title, books.author 
       FROM borrowings b 
       JOIN books ON b.book_id = books.id 
       WHERE b.user_id = ?`,
      [userId]
    );
    return rows;
  },
  
  getAll: async () => {
    const [rows] = await db.execute(
      `SELECT b.*, 
        books.title AS book_title, 
        books.author AS book_author,
        users.username AS user_username,
        users.full_name AS user_full_name
       FROM borrowings b 
       JOIN books ON b.book_id = books.id 
       JOIN users ON b.user_id = users.id`
    );
    return rows;
  },
  
  findById: async (id) => {
    const [rows] = await db.execute(
      `SELECT b.*, 
        books.title AS book_title, 
        books.author AS book_author,
        users.username AS user_username,
        users.full_name AS user_full_name
       FROM borrowings b 
       JOIN books ON b.book_id = books.id 
       JOIN users ON b.user_id = users.id
       WHERE b.id = ?`,
      [id]
    );
    return rows[0];
  }
};

module.exports = Borrowing;
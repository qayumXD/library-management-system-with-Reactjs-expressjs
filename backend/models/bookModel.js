const db = require('../config/db');

const Book = {
  create: async (bookData) => {
    const { title, author, isbn, publication_year, genre, description, available_copies, total_copies } = bookData;
    
    const [result] = await db.execute(
      'INSERT INTO books (title, author, isbn, publication_year, genre, description, available_copies, total_copies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, author, isbn, publication_year, genre, description, available_copies, total_copies]
    );
    
    return result.insertId;
  },
  
  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  },
  
  findByIsbn: async (isbn) => {
    const [rows] = await db.execute('SELECT * FROM books WHERE isbn = ?', [isbn]);
    return rows[0];
  },
  
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM books');
    return rows;
  },
  
  update: async (id, bookData) => {
    const { title, author, isbn, publication_year, genre, description, available_copies, total_copies } = bookData;
    
    const [result] = await db.execute(
      'UPDATE books SET title = ?, author = ?, isbn = ?, publication_year = ?, genre = ?, description = ?, available_copies = ?, total_copies = ? WHERE id = ?',
      [title, author, isbn, publication_year, genre, description, available_copies, total_copies, id]
    );
    
    return result.affectedRows > 0;
  },
  
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM books WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Book;
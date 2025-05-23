import React, { useState, useEffect } from 'react';
import { fetchBooks, deleteBook } from '../../services/api';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState(null);
  
  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
      }
    };
    
    getBooks();
  }, []);
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        setDeleting(id);
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
        alert('Book deleted successfully');
      } catch (err) {
        setError(err.message || 'Failed to delete book');
      } finally {
        setDeleting(null);
      }
    }
  };
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="manage-books-container">
      <h2>Manage Books</h2>
      
      <div className="actions-bar">
        <Link to="/admin/books/add" className="button">Add New Book</Link>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Available / Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.available_copies} / {book.total_copies}</td>
                <td>
                  <Link to={`/admin/books/edit/${book.id}`} className="button">Edit</Link>
                  <button 
                    onClick={() => handleDelete(book.id)} 
                    disabled={deleting === book.id}
                    className="button delete"
                  >
                    {deleting === book.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBooks;
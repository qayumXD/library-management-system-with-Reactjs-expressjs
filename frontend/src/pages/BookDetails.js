import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, borrowBook } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [borrowing, setBorrowing] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
      }
    };
    
    getBook();
  }, [id]);
  
  const handleBorrow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      setBorrowing(true);
      
      // Calculate due date (2 weeks from now)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      
      await borrowBook({
        user_id: user.id,
        book_id: book.id,
        due_date: dueDate.toISOString().split('T')[0]
      });
      
      // Update book data to reflect the borrowed copy
      setBook({
        ...book,
        available_copies: book.available_copies - 1
      });
      
      alert('Book borrowed successfully!');
      
    } catch (err) {
      setError(err.message || 'Failed to borrow book');
    } finally {
      setBorrowing(false);
    }
  };
  
  if (loading) return <div>Loading book details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!book) return <div>Book not found</div>;
  
  return (
    <div className="book-details-container">
      <h2>{book.title}</h2>
      
      <div className="book-info">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Publication Year:</strong> {book.publication_year}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Available Copies:</strong> {book.available_copies} / {book.total_copies}</p>
        
        {book.description && (
          <div className="book-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        )}
        
        {isAuthenticated && book.available_copies > 0 && (
          <button 
            onClick={handleBorrow} 
            disabled={borrowing}
            className="borrow-button"
          >
            {borrowing ? 'Processing...' : 'Borrow Book'}
          </button>
        )}
        
        {book.available_copies === 0 && (
          <p className="unavailable-message">This book is currently unavailable.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;

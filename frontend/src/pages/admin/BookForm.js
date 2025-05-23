import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, createBook, updateBook } from '../../services/api';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publication_year: '',
    genre: '',
    description: '',
    available_copies: 0,
    total_copies: 0
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const getBook = async () => {
      if (isEditing) {
        try {
          const book = await fetchBookById(id);
          setFormData(book);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch book details');
          setLoading(false);
        }
      }
    };
    
    getBook();
  }, [id, isEditing]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError('');
      
      // Ensure numeric fields are numbers
      const bookData = {
        ...formData,
        publication_year: parseInt(formData.publication_year) || null,
        available_copies: parseInt(formData.available_copies) || 0,
        total_copies: parseInt(formData.total_copies) || 0
      };
      
      if (isEditing) {
        await updateBook(id, bookData);
      } else {
        await createBook(bookData);
      }
      
      navigate('/admin/books');
      
    } catch (err) {
      setError(err.message || 'Failed to save book');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) return <div>Loading book details...</div>;
  
  return (
    <div className="book-form-container">
      <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="publication_year">Publication Year</label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            value={formData.publication_year || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="available_copies">Available Copies</label>
            <input
              type="number"
              id="available_copies"
              name="available_copies"
              value={formData.available_copies}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="total_copies">Total Copies</label>
            <input
              type="number"
              id="total_copies"
              name="total_copies"
              value={formData.total_copies}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Book'}
          </button>
          <button type="button" onClick={() => navigate('/admin/books')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;

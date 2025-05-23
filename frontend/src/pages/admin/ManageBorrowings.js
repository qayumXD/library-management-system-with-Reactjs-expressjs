import React, { useState, useEffect } from 'react';
import { getAllBorrowings, returnBook } from '../../services/api';

const ManageBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [returning, setReturning] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'returned', 'overdue'
  
  useEffect(() => {
    const getBorrowings = async () => {
      try {
        const data = await getAllBorrowings();
        setBorrowings(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch borrowings');
        setLoading(false);
      }
    };
    
    getBorrowings();
  }, []);
  
  const handleReturn = async (borrowingId) => {
    try {
      setReturning(borrowingId);
      await returnBook(borrowingId);
      
      // Update the list of borrowings
      setBorrowings(borrowings.map(b => 
        b.id === borrowingId ? { ...b, status: 'returned', return_date: new Date().toISOString() } : b
      ));
      
      alert('Book returned successfully!');
      
    } catch (err) {
      setError(err.message || 'Failed to return book');
    } finally {
      setReturning(null);
    }
  };
  
  if (loading) return <div>Loading borrowings...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  // Filter borrowings based on selected filter
  const filteredBorrowings = borrowings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'active') return b.status === 'borrowed';
    if (filter === 'returned') return b.status === 'returned';
    if (filter === 'overdue') return b.status === 'overdue';
    return true;
  });
  
  return (
    <div className="manage-borrowings-container">
      <h2>Manage Borrowings</h2>
      
      <div className="filter-bar">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'returned' ? 'active' : ''} 
          onClick={() => setFilter('returned')}
        >
          Returned
        </button>
        <button 
          className={filter === 'overdue' ? 'active' : ''} 
          onClick={() => setFilter('overdue')}
        >
          Overdue
        </button>
      </div>
      
      {filteredBorrowings.length === 0 ? (
        <p>No borrowings found.</p>
      ) : (
        <table className="borrowings-table">
          <thead>
            <tr>
              <th>Book</th>
              <th>User</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBorrowings.map(borrowing => (
              <tr key={borrowing.id} className={borrowing.status}>
                <td>{borrowing.book_title}</td>
                <td>{borrowing.user_full_name}</td>
                <td>{new Date(borrowing.borrow_date).toLocaleDateString()}</td>
                <td>{new Date(borrowing.due_date).toLocaleDateString()}</td>
                <td>
                  {borrowing.return_date 
                    ? new Date(borrowing.return_date).toLocaleDateString() 
                    : '-'
                  }
                </td>
                <td className={`status ${borrowing.status}`}>
                  {borrowing.status}
                </td>
                <td>
                  {borrowing.status === 'borrowed' && (
                    <button 
                      onClick={() => handleReturn(borrowing.id)} 
                      disabled={returning === borrowing.id}
                    >
                      {returning === borrowing.id ? 'Processing...' : 'Return'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBorrowings;
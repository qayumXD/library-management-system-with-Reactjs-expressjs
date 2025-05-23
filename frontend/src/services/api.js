const getToken = () => localStorage.getItem('token');

const createHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const fetchBooks = async () => {
  try {
    const response = await fetch('/api/books', {
      headers: createHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`/api/books/${id}`, {
      headers: createHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(bookData)
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to create book');
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: createHeaders(),
        body: JSON.stringify(bookData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update book');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  };
  
  export const deleteBook = async (id) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: createHeaders()
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete book');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  };
  
  export const borrowBook = async (borrowData) => {
    try {
      const response = await fetch('/api/borrowings', {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(borrowData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to borrow book');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Error borrowing book:', error);
      throw error;
    }
  };
  
  export const returnBook = async (borrowId) => {
    try {
      const response = await fetch(`/api/borrowings/${borrowId}/return`, {
        method: 'PUT',
        headers: createHeaders()
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to return book');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Error returning book:', error);
      throw error;
    }
  };
  
  export const getUserBorrowings = async (userId) => {
    try {
      const response = await fetch(`/api/borrowings/user/${userId}`, {
        headers: createHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user borrowings');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Error fetching user borrowings:', error);
      throw error;
    }
  };
  
  export const getAllBorrowings = async () => {
    try {
      const response = await fetch('/api/borrowings', {
        headers: createHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch all borrowings');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Error fetching all borrowings:', error);
      throw error;
    }
  };
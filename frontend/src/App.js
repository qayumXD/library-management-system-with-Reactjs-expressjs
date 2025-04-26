import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BooksList from './pages/BooksList';
import BookDetails from './pages/BookDetails';
import UserBorrowings from './pages/UserBorrowings';
import ManageBooks from './pages/admin/ManageBooks';
import BookForm from './pages/admin/BookForm';
import ManageBorrowings from './pages/admin/ManageBorrowings';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<BooksList />} />
              <Route path="/books/:id" element={<BookDetails />} />
              
              {/* Protected user routes */}
              <Route path="/borrowings" element={
                <ProtectedRoute>
                  <UserBorrowings />
                </ProtectedRoute>
              } />
              
              {/* Protected admin routes */}
              <Route path="/admin/books" element={
                <ProtectedRoute roles={['admin', 'librarian']}>
                  <ManageBooks />
                </ProtectedRoute>
              } />
              <Route path="/admin/books/add" element={
                <ProtectedRoute roles={['admin', 'librarian']}>
                  <BookForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/books/edit/:id" element={
                <ProtectedRoute roles={['admin', 'librarian']}>
                  <BookForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/borrowings" element={
                <ProtectedRoute roles={['admin', 'librarian']}>
                  <ManageBorrowings />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
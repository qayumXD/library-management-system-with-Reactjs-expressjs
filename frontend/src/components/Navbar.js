import React from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';



const Navbar = () => {

  const { user, logout, isAuthenticated } = useAuth();

  

  return (

    <nav className="navbar">

      <div className="navbar-brand">

        <Link to="/">Library Management System</Link>

      </div>

      <div className="navbar-menu">

        <Link to="/" className="navbar-item">Home</Link>

        <Link to="/books" className="navbar-item">Books</Link>

        

        {isAuthenticated ? (

          <>

            <Link to="/borrowings" className="navbar-item">My Borrowings</Link>

            {user && (user.role === 'admin' || user.role === 'librarian') && (

              <>

                <Link to="/admin/books" className="navbar-item">Manage Books</Link>

                <Link to="/admin/borrowings" className="navbar-item">Manage Borrowings</Link>

              </>

            )}

            <div className="navbar-item">

              <span>Welcome, {user.full_name}</span>

              <button onClick={logout} className="button is-light ml-2">Logout</button>

            </div>

          </>

        ) : (

          <>

            <Link to="/login" className="navbar-item">Login</Link>

            <Link to="/register" className="navbar-item">Register</Link>

          </>

        )}

      </div>

    </nav>

  );

};



export default Navbar;
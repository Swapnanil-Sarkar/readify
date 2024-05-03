/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import BookList from './BookList';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">
          <img src="https://kalvium.com/wp-content/uploads/2022/07/fav.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
          Kalvium
          </Link>
          <Link to="/register" className="register-button">
          Register
          </Link>
        </div>
        </nav>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<BookList onSearch={handleSearch} searchQuery={searchQuery} />}
            />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

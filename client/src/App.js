import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookingApp from './components/BookingApp'; // Existing booking component
import AdminPanel from './components/AdminPanel'; // New admin component
import './App.css'; // Add styles for the navigation

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Left-side Navigation Bar */}
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/">Customer Booking</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className="content">
          <Routes>
            <Route path="/" element={<BookingApp />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

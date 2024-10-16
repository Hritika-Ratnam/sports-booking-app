import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Icons for dark/light mode
import BookingApp from './components/BookingApp'; // Existing booking component
import AdminPanel from './components/AdminPanel'; // New admin component
import './App.css'; // Add styles for the navigation

const App = () => {
  const [theme, setTheme] = useState('light'); // Theme: 'light' or 'dark'
  // Toggle between dark and light theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark'); // Save theme in localStorage
    } else {
      setTheme('light');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light'); // Save theme in localStorage
    }
  };

  // Load the saved theme from localStorage when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);
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
         <div className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
            </div>
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

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import './App.css';

function App() {
  // Helper function to check if user is logged in
  const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  // Protected Route: If not logged in, force them to Login page
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Route for Login Page */}
        <Route path="/" element={<Login />} />
        
        {/* Route for Home Page (Protected) */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to BlogSpace</h1>
      <p>A simple and secure platform for publishing and managing blogs.</p>
      <button onClick={() => navigate('/login')} style={{ margin: '10px' }}>Login</button>
      <button onClick={() => navigate('/signup')} style={{ margin: '10px' }}>Signup</button>
    </div>
  );
}

export default HomePage;

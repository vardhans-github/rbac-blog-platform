import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogList from './pages/BlogList';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
         <Route path="/blogs" element={<BlogList />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

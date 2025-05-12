import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', res.data.token); // Save JWT
//       setMessage('Login successful!');
//       navigate('/blogs');
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     }
//   };


  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', form);
    const { token, role } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role); // Save role

    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/blogs');
    }
  } catch (err) {
    setMessage(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;

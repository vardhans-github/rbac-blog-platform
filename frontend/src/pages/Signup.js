import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit called");
    console.log("Form data before submit:", form); 
    try {
      
       // First signup
        await axios.post('http://localhost:5000/api/auth/signup', form);

        // Then login
        const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: form.email,
        password: form.password
        });



      console.log(res.data);
      const { token, role } = res.data;
        
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      console.log(token);
      console.log(role);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/blogs');
      }
      setMessage(res.data.message);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }


  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />
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

        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Signup;

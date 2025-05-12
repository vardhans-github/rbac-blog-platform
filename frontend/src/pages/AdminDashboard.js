import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  // Fetch existing blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
      } catch (err) {
        setMessage('Failed to fetch blogs.');
      }
    };

    fetchBlogs();
  }, [token]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs([res.data, ...blogs]);
      setFormData({ title: '', content: '' });
      setMessage('Blog created!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating blog');
    }
  };

  // Delete blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      setMessage('Error deleting blog');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button type="submit">Create Blog</button>
      </form>

      <hr />

      <h3>Existing Blogs</h3>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <h4>{blog.title}</h4>
          <p>{blog.content}</p>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;

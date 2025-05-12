import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlogs(res.data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to load blogs');
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Blog Posts</h2>
      {message && <p>{message}</p>}
      {blogs.map((blog) => (
        <div key={blog._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <small>Author: {blog.author}</small>
        </div>
      ))}
    </div>
  );
}

export default BlogList;

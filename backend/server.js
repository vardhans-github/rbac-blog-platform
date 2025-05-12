const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// console.log('JWT:', process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');

console.log('JWT:', process.env.JWT_SECRET);

const cors = require('cors');

const app = express();


// Middleware
app.use(express.json());
app.use(cors());


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const protectedRoutes = require('./routes/protectedRoute');
app.use('/api/protected', protectedRoutes);

const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);


// Sample route to test
app.get('/', (req, res) => {
  res.send('API is working!');
});


const URL = "mongodb+srv://yashvardhanmalve000:tJZbzXchepv47ovI@rbac.p2ydmxe.mongodb.net/?retryWrites=true&w=majority&appName=rbac";

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection failed:', err.message);
});

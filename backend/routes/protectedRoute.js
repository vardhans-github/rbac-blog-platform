const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/authMiddleware');

// Anyone with a valid token can access
router.get('/user', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, you're logged in!` });
});

// Only admins can access
router.get('/admin', verifyToken, restrictTo('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! You have access.' });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const { verifyToken, restrictTo } = require('../middleware/authMiddleware');

const {getAllBlogs, updateBlog, deleteBlog, postBlog} = require('../controllers/blogController');

router.get('/', verifyToken, getAllBlogs);

router.post('/', verifyToken, restrictTo('admin'), postBlog);

router.put('/:id', verifyToken, restrictTo('admin'), updateBlog);

router.delete('/:id', verifyToken, restrictTo('admin'), deleteBlog);

module.exports = router;






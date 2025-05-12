const BlogPost = require("../models/BlogPost");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: err.message });
  }
};


exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await BlogPost.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog', error: err.message });
  }
};


exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogPost.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog', error: err.message });
  }
};

exports.postBlog =  async(req, res) => {
  console.log("Inside blog post:")
  console.log("Req:", req.body);
  const { title, content } = req.body;
  
  const post = new BlogPost({
    title,
    content,
    author: req.user.id
  });
  await post.save();
  res.status(201).json(post);
};

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("inside login");
    console.log("email = ", email, " pass : ", password);
    // console.log("inside login");
    
    // Check user
    const user = await User.findOne({ email });
    
    console.log("user:" , user);

    if (!user) {
      console.log("!user");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("match : " ,isMatch);
    if (!isMatch) {

      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    

    res.json({ token, role: user.role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

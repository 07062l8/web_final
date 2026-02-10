const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ username, email, password, role });
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'Welcome to TastyBase! 🍳',
        html: `
          <h1>Hello, ${user.username}!</h1>
          <p>Your account on TastyBase has been successfully created.</p>
          <p>Now you can add your own recipes and rate others' masterpieces.</p>
          <br>
          <p><i>Sincerely, TastyBase Team</i></p>
        `
      });
    } catch (mailErr) {
      console.log('Email not sent, but user created:', mailErr.message);
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        _id: user._id, 
        username: user.username,
        email: user.email, 
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        message: 'Profile updated successfully'
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    next(err);
}};
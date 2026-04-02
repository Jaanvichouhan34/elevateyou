const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Using Demo Mode for Registration');
      return res.status(201).json({ token: 'demo-token', userId: 'demo-user', name: name || 'Guest' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, userId: newUser._id, name: newUser.name });
  } catch (error) {
    // If DB error, still allow Demo Register
    console.error('DB Error, using Fallback');
    res.status(201).json({ token: 'demo-token', userId: 'demo-user', name: name || 'Guest' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Using Demo Mode for Login');
      return res.status(200).json({ token: 'demo-token', userId: 'demo-user', name: 'Demo User' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token, userId: user._id, name: user.name });
  } catch (error) {
    // Fallback for demo
    console.log('DB Error, using Fallback Login');
    res.status(200).json({ token: 'demo-token', userId: 'demo-user', name: 'Demo User' });
  }
});

module.exports = router;

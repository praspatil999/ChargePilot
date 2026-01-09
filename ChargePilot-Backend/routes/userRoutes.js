// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// GET user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    
    // Import your User model
    const User = require('../models/User');
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // TODO: Fetch charging stats from your database
    // This is sample data - replace with actual queries
    const stats = {
      totalSessions: 0,
      totalEnergy: 0,
      totalCost: 0,
      avgSessionTime: 0,
      co2Saved: 0
    };

    // TODO: Fetch recent sessions
    const recentSessions = [];

    // TODO: Fetch vehicles
    const vehicles = [];

    // TODO: Fetch payment methods
    const paymentMethods = [];

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      memberSince: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A',
      stats,
      recentSessions,
      vehicles,
      paymentMethods
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update user profile
router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const { name, email, phone } = req.body;

    const User = require('../models/User');
    
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
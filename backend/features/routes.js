// routes/routes.js
const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth'); // Import JWT middleware

// Public route (No authentication required)
router.get('/public', (req, res) => {
    res.json({ message: 'This is a public route' });
});

// Protected route (JWT authentication required)
router.get('/profile', ensureAuthenticated, (req, res) => {
    res.json({ message: 'Welcome to your profile', user: req.user });
});

module.exports = router;

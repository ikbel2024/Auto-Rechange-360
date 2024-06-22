const express = require('express');
const passport = require('passport');
const { login, register, googleAuthCallback } = require('../controllers/usercontroller');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);

module.exports = router;
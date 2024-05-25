const express = require('express');
const { check } = require('express-validator');
const passport = require('passport');
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  googleAuthCallback
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', [
  check('nom').not().isEmpty().withMessage('Name is required'),
  check('prenom').not().isEmpty().withMessage('Prenom is required'),
  check('adresse').not().isEmpty().withMessage('Adresse is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('num_tel').isNumeric().withMessage('Valid phone number is required'),
  check('mot_de_passe').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').isIn(['client', 'fournisseur', 'livreur', 'admin']).withMessage('Invalid role')
], register);

// Login route
router.post('/login', [
  check('email').isEmail().withMessage('Valid email is required'),
  check('mot_de_passe').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').isIn(['client', 'fournisseur', 'livreur', 'admin']).withMessage('Invalid role')
], login);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);

// Get all users (admin only)
router.get('/users', authMiddleware(['admin']), getAllUsers);

// Get user by ID (admin only)
router.get('/users/:id', authMiddleware(['admin']), getUserById);

// Update user (admin only)
router.put('/users/:id', authMiddleware(['admin']), updateUser);

// Delete user (admin only)
router.delete('/users/:id', authMiddleware(['admin']), deleteUser);

module.exports = router;

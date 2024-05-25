const express = require('express');
const passport = require('passport');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to register a new user
router.post('/register', [
  check('nom').not().isEmpty().withMessage('Name is required'),
  check('prenom').not().isEmpty().withMessage('Prenom is required'),
  check('adresse').not().isEmpty().withMessage('Adresse is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('num_tel').isNumeric().withMessage('Valid phone number is required'),
  check('mot_de_passe').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').isIn(['client', 'fournisseur', 'livreur', 'admin']).withMessage('Invalid role')
], register);

// Route to log in a user
router.post('/login', [
  check('email').isEmail().withMessage('Valid email is required'),
  check('mot_de_passe').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').isIn(['client', 'fournisseur', 'livreur', 'admin']).withMessage('Invalid role')
], login);

// Protected route example (accessible only by admin)
router.get('/admin', passport.authenticate('jwt', { session: false }), authMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Welcome admin' });
});

// Protected route example (accessible only by fournisseur)
router.get('/fournisseur', passport.authenticate('jwt', { session: false }), authMiddleware(['fournisseur']), (req, res) => {
  res.json({ message: 'Welcome fournisseur' });
});

module.exports = router;
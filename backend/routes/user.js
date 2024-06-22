const express = require('express');
const { check } = require('express-validator');
const passport = require('passport');
const { resetPassword } = require('../controllers/usercontroller');
const User = require('../models/user');

const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  googleAuthCallback
} = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const ProfilePhoto = require('../models/ProfilePhoto');


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
]
, register);

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
// reset password
router.post('/reset-password', [
  check('num_tel').isNumeric().withMessage('Valid phone number is required'),
  check('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], resetPassword);

// route pour verification par mail 
router.get('/validate/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      validationToken: req.params.token,
      validationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send('Token de validation invalide ou expiré.');
    }

    user.isValidated = true;
    user.validationToken = undefined;
    user.validationTokenExpiry = undefined;
    await user.save();

    res.send('Email validé avec succès.');
  } catch (error) {
    res.status(500).send('Erreur serveur.');
  }
});

router.post('/profile-photo', upload.single('profilePhoto'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log('userid', user); // Use await to wait for user data
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Now you can access user properties like user._id
    // ... other code ...
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.put('/ban/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    await user.banUser();
    res.json({ msg: 'Utilisateur banni avec succès' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour débannir un utilisateur
router.put('/unban/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    await user.unbanUser();
    res.json({ msg: 'Utilisateur débanni avec succès' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
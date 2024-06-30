const express = require('express');
const { check } = require('express-validator');
const passport = require('passport');
const { resetPassword } = require('../controllers/usercontroller');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  googleAuthCallback,
  getUserStatsByRole,
  getUserLoginStats,
  getBannedUserStats,
  getUserRegistrationStats

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
], register);

// Login route
router.post('/login', [
  check('email').isEmail().withMessage('Valid email is required'),
  check('mot_de_passe').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
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

// Reset password
/*router.post('/reset-password', [
  check('num_tel').isNumeric().withMessage('Valid phone number is required'),
  check('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], resetPassword);*/

// Route to get user statistics by role
router.get('/stats/role', async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get user login statistics
router.get('/stats/login', async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $group: { _id: "$email", loginCount: { $sum: "$loginCount" } } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get banned user statistics
router.get('/stats/banned', async (req, res) => {
  try {
    const stats = await User.countDocuments({ isBanned: true });
    res.json({ bannedUserCount: stats });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get user registration statistics by month
router.get('/stats/registration', async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for email verification
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

router.post('/request-reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();
    console.log(`Token: ${resetToken}, Expires: ${new Date(user.resetPasswordExpires)}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'grakrem23@gmail.com',
        pass: 'iori eoka tnst gsne' // Replace with your app password
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'grakrem23@gmail.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `http://localhost:4200/resetpassword/${resetToken}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent:', info.response);
      res.status(200).send('Reset password email sent');
    });
  } catch (err) {
    console.error('Error requesting password reset:', err);
    res.status(500).send('Error requesting password reset');
  }
});

router.post('/resetpassword/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log('Token invalid or expired');
      return res.status(400).send('Password reset token is invalid or has expired.');
    }

    console.log('User found:', user.email);
    console.log('Token valid until:', new Date(user.resetPasswordExpires));
    console.log('Current time:', new Date());

    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).send('Password must be at least 6 characters long.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.mot_de_passe = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send('Password has been reset.');
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).send('Error resetting password.');
  }
});


module.exports = router;

const express = require('express');
const { check } = require('express-validator');
const passport = require('passport');
const { resetPassword } = require('../controllers/usercontroller');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');



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
  getUserRegistrationStats, 
  uploadProfilePhoto

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

// Route pour bannir un utilisateur
router.put('/ban/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, { isBanned: true }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User banned successfully', user: updatedUser });
  } catch (error) {
    console.error('Error banning user:', error);
    res.status(500).json({ error: 'Failed to ban user' });
  }
});

// Upload profile photo (any user)
router.post('/upload-profile-photo', async (req, res) => {
  try {
    const { userId, photoUrl } = req.body;

    // Vérifiez si userId et photoUrl sont fournis
    if (!userId || !photoUrl) {
      return res.status(400).json({ error: 'userId and photoUrl are required.' });
    }

    // Créer un nouveau document de photo de profil
    const newProfilePhoto = new ProfilePhoto({
      userId: userId,
      photoUrl: photoUrl
    });

    // Sauvegarder le document dans la base de données
    const savedProfilePhoto = await newProfilePhoto.save();

    // Mettre à jour le champ profilePhotoUrl de l'utilisateur
    await User.findByIdAndUpdate(userId, { profilePhotoUrl: photoUrl });

    // Répondre avec succès
    res.status(200).json({ message: 'Profile photo uploaded successfully.', savedProfilePhoto });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({ error: 'Failed to upload profile photo.' });
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

    user.mot_de_passe = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Retourner une réponse JSON indiquant que le mot de passe a été réinitialisé avec succès
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).send('Error resetting password.');
  }
});

const client = new OAuth2Client('622271200203-obvk96u36cm1ivhuvbjum2hpgj2h6pri.apps.googleusercontent.com');

// Route to handle Google login
router.post('/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '622271200203-obvk96u36cm1ivhuvbjum2hpgj2h6pri.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = new User({
      email: payload.email,
      googleId: payload.sub,
      // Other fields can be filled later
    });
    await user.save();
  }

  res.json({ message: 'Google login successful', user });
});

// Route to update user information
router.post('/update-user', async (req, res) => {
  const { email, name, firstName, address, phoneNumber, fiscalNumber } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: { name, firstName, address, phoneNumber, fiscalNumber }
      },
      { new: true }
    );

    res.json({ message: 'User information updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const RECAPTCHA_SECRET_KEY = '6LevzggqAAAAAJ7y_2wbui85hqykXDyJSQ-2c-Mq'; // Remplacez par votre clé secrète reCAPTCHA

router.post('/submit-form', async (req, res) => {
  const { captchaResponse } = req.body;

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captchaResponse}`;

  try {
    const response = await axios.post(verifyUrl);
    const { success } = response.data;

    if (success) {
      // Si le reCAPTCHA est validé avec succès, continuer le traitement du formulaire
      res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      // Si le reCAPTCHA échoue, renvoyer une erreur
      res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({ message: 'Error verifying reCAPTCHA' });
  }
});

module.exports = router;

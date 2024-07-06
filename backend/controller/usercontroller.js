const User = require('../model/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const ProfilePhoto = require('../model/ProfilePhoto');


// Register a new user
exports.register = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nom, prenom, adresse, email, num_tel, mot_de_passe, role, matricule_fiscale } = req.body;

    try {
        const user = new User({ nom, prenom, adresse, email, num_tel, mot_de_passe, role, matricule_fiscale });
        const savedUser = await user.save();
        await user.sendValidationEmail();
        res.status(201).json({
            message: 'User registered successfully. Please check your email for verification link.',
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Login a user
exports.login = async(req, res) => {
    const { email, mot_de_passe, role } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        //if (user.role !== role) return res.status(403).json({ message: 'Role does not match' });//

        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        if (user.isBanned) return res.status(403).json({ message: 'Your account is banned' });

        // Incrémenter le compteur de connexions
        user.loginCount += 1;
        await user.save();
        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user by ID
exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
exports.updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true };

        const updatedUser = await User.findByIdAndUpdate(id, updates, options);
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.uploadProfilePhoto = async(req, res) => {
    try {
        const userId = req.params.id;
        const profilePhoto = req.file;

        if (!profilePhoto) {
            return res.status(400).send('No photo uploaded.');
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Mettre à jour l'URL de la photo de profil de l'utilisateur
        user.profilePhotoUrl = `/uploads/${profilePhoto.filename}`;
        await user.save();

        res.status(200).send('Profile photo uploaded successfully.');
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        res.status(500).send('Error uploading profile photo.');
    }
};


/*exports.resetPassword = async (req, res) => {
  const { num_tel, newPassword } = req.body;
  try {
    const user = await User.findOne({ num_tel });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.mot_de_passe = await bcrypt.hash(newPassword, 10); // Ensure to hash the password
    await user.save();

    sendSMS(user.num_tel, 'Votre mot de passe a été réinitialisé avec succès.');
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};*/

exports.verifyEmail = async(req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ validationToken: token, validationTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.isValidated = true;
        user.validationToken = undefined;
        user.validationTokenExpiry = undefined;

        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.banUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, { banned: true }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User banned successfully', user: updatedUser });
    } catch (error) {
        console.error('Error banning user:', error);
        res.status(500).json({ error: 'Failed to ban user' });
    }
}


exports.unbanUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isBanned = false;
        await user.save();

        res.json({ message: 'User unbanned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }





};
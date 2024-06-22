const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { JWT_SECRET } = process.env;
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const config = require('../config');


exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nom, prenom, adresse, email, num_tel, mot_de_passe, role, matricule_fiscale } = req.body;

  try {
    const user = new User({ nom, prenom, adresse, email, num_tel, mot_de_passe, role, matricule_fiscale });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'grakrem23@gmail.com',
        pass: '25011991a'
      }
    });

    const mailOptions = {
      from: 'grakrem23@gmail.com',
      to: user.email,
      subject: 'Account Verification',
      text: `Please verify your account by clicking the following link: 
      http://localhost:3000/api/users/verify/${user.validationToken}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered, please check your email for verification link.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== role) return res.status(403).json({ message: 'Role does not match' });

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.isBanned) return res.status(403).json({ message: 'Your account is banned' });

    // Incrémenter le compteur de connexions
    user.loginCount += 1;
    await user.save();


    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
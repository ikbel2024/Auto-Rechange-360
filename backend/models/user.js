const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const transporter = require('../config/mailer');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  num_tel: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  role: { type: String, enum: ['client', 'fournisseur', 'livreur', 'admin'], required: true },
  matricule_fiscale: { 
    type: String,
    validate: {
      validator: function(v) {
        return this.role !== 'fournisseur' || (this.role === 'fournisseur' && v);
      },
      message: props => `Matricule fiscale est obligatoire pour le rôle fournisseur.`
    }
  },
  googleId: { type: String },
  isValidated: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  loginCount: { type: Number, default: 0 },
  validationToken: { type: String },
  validationTokenExpiry: { type: Date },
  profilePhotoUrl: { type: String }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('mot_de_passe')) return next();
  const salt = await bcrypt.genSalt(10);
  this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
  next();
});

// Méthode pour générer un token de validation et envoyer un email de confirmation
userSchema.methods.sendValidationEmail = async function() {
  const token = crypto.randomBytes(20).toString('hex');
  this.validationToken = token;
  this.validationTokenExpiry = Date.now() + 3600000; // 1 heure

  const mailOptions = {
    from: 'grakrem23@gmail.com',
    to: this.email,
    subject: 'Email de validation',
    text: `Cliquez sur le lien suivant pour valider votre compte : 
           http://localhost:3000/api/users/verify/${token}`
  };

  await this.save();

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    } else {
      console.log('Email envoyé:', info.response);
    }
  });
};

userSchema.methods.banUser = async function() {
  this.isBanned = true;
  await this.save();
};

userSchema.methods.unbanUser = async function() {
  this.isBanned = false;
  await this.save();
};

module.exports = mongoose.model('User', userSchema);

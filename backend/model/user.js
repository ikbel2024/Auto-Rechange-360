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
  profilePhotoUrl: { type: String },
  resetPasswordToken : { type: String }, 
  resetPasswordExpires: { type: Date },

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
  this.isValidated = true ; 

  const mailOptions = {
    from: 'grakrem23@gmail.com',
    to: this.email,
    subject: 'Email de validation',
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de Compte</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #4CAF50;
            }
            .content {
                font-size: 16px;
                line-height: 1.6;
            }
            .content p {
                margin: 0 0 20px;
            }
            .content a {
                display: inline-block;
                text-decoration: none;
                background-color: #4CAF50;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 16px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Confirmez votre compte</h1>
            </div>
            <div class="content">
                <p>Merci de vous être inscrit sur notre site. Pour finaliser votre inscription et valider votre compte, veuillez cliquer sur le lien ci-dessous :</p>
                <p style="text-align: center;">
                    <a href="http://localhost:3000/api/users/verify/${token}">Valider mon compte</a>
                </p>
                <p>Si vous n'avez pas créé de compte, veuillez ignorer cet email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Votre Site. Tous droits réservés.</p>
            </div>
        </div>
    </body>
    </html>
    `
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

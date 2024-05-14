const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schéma pour le modèle User
const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  adresse: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  num_tel: { type: Number, required: true, unique: true },
  mot_de_passe:  { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }, // Référence vers le modèle Role
  matricule_fiscale: {
    type: String,
    required: function() {
      return this.roleId; // Matricule fiscale requis uniquement si un rôle est défini
    }
  }
});

userSchema.plugin(uniqueValidator);

// Modèle User basé sur le schéma
const User = mongoose.model('User', userSchema);

module.exports = User;

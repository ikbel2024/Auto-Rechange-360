const mongoose = require('mongoose');

// Schéma pour le modèle Role
const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['client', 'fournisseur', 'livreur'],
    required: true
  }
});

// Modèle Role basé sur le schéma
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  num_tel: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  role: { type: String, enum: ['client', 'fournisseur', 'livreur', 'admin'], required: true },
  matricule_fiscale: { type: String },
  googleId: { type: String }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('mot_de_passe')) return next();
  const salt = await bcrypt.genSalt(10);
  this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);

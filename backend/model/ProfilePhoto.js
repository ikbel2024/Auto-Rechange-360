const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilePhotoSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProfilePhoto', profilePhotoSchema);
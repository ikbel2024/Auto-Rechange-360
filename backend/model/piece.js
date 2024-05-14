const mongoose = require('mongoose');

const PieceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    reference: { type: String, required: true },
    prix: { type: Number, required: true },
    fabricant: { type: String, required: true }
});

const Piece = mongoose.model('Piece', PieceSchema);

module.exports = Piece;

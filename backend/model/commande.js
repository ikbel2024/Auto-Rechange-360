const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client: { type: String, required: true },
    adresse: { type: String, required: true },
    dateCommande: { type: Date, default: Date.now },
    pieces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piece' }],
    produits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }],

    etat: { type: String, required: true, default: 'En cours' }
});

const Commande = mongoose.model('Commande', CommandeSchema);

module.exports = Commande;

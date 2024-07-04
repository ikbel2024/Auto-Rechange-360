const mongoose = require('mongoose');

const LivraisonSchema = new mongoose.Schema({
    commande: { type: mongoose.Schema.Types.ObjectId, ref: 'Commande', required: true },
    dateLivraison: { type: Date, default: Date.now },
    statutLivraison: { type: String, required: true, default: 'En préparation' }
});

const Livraison = mongoose.model('Livraison', LivraisonSchema);

module.exports = Livraison;

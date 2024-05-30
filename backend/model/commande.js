const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client: { type: String, required: true },
    adresse: { type: String, required: true },
    dateCommande: { type: Date, default: Date.now },
    produits: [{
        produitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
        quantite: { type: Number, required: true }
    }],
    etat: { type: String, required: true, default: 'En cours' },
    retour: {
        estRetournee: { type: Boolean, default: false },
        dateRetour: { type: Date },
        motifRetour: { type: String }
    },
    annulation: {
        estAnnulee: { type: Boolean, default: false },
        dateAnnulation: { type: Date },
        motifAnnulation: { type: String }
    },
    total:{ type: Number }
});

const Commande = mongoose.model('Commande', CommandeSchema);

module.exports = Commande;

const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    reference: { type: String, required: true },
    dateajouter: { type: String, required: true },
    prix: { type: Number, required: true },
    description: { type: String, required: true },
    idmarque: { type: String, required: true },
    idfournisseur: { type: String, required: true }
});

const Produit = mongoose.model('Produit', ProduitSchema);

module.exports = Produit;

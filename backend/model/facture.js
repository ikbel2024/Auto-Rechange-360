

// Modèle de sous-document pour les lignes de facture
/*const ligneFactureSchema = new mongoose.Schema({
    produit: { type: String, required: true },
    quantite: { type: Number, required: true },
    prixUnitaire: { type: Number, required: true }
});

// Modèle de facture
const factureSchema = new mongoose.Schema({
    vente: { type: String, required: true },
    dateFacture: { type: Date, required: true },
    modePaiement: { type: String, required: true },
    montantTotal: { type: Number, required: true },
    client: { type: String, required: true },
    lignesFacture: [ligneFactureSchema], // Sous-document pour les lignes de facture
    notes: { type: String }
});

const Facture = mongoose.model('Facture', factureSchema);*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const factureSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  vente: String,
  dateFacture: Date,
  client: String,
  note: String,
  montantTotal: Number,
  modePaiement: String,
});

const Facture = mongoose.model('Facture', factureSchema);

module.exports = Facture;
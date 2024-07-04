const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanierSchema = new Schema({
    userId: { type: String, required: true },
    products: [{
        produitId: { type: Schema.Types.ObjectId, ref: 'Produit', required: true },
        stockQuantity: { type: Number, required: true }
    }]
});

module.exports = mongoose.model('Panier', PanierSchema);

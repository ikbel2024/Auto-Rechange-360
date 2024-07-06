// Importing the mongoose module
var mongo = require("mongoose");

// Defining the Schema class
const Schema = mongo.Schema;

// Creating a new Schema for the Fournisseur
const produitSchema = new Schema({

    name: { type: String, required: true },
    reference: { type: String, required: true },
    dateAdded: { type: Date, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    brandid: { type: String, required: true },
    category: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    supplierId: { type: String, required: true },
    image: { type: [String], required: true }

})
const Produit = mongo.models.produit || mongo.model("produit", produitSchema, "Products");

module.exports = Produit;
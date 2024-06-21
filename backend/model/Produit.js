// Importing the mongoose module
var mongo = require("mongoose");

// Defining the Schema class
const Schema = mongo.Schema;

// Creating a new Schema for the Fournisseur
const produit = new Schema({

    name: String,
    reference: String,
    dateAdded: Date,
    price: Number,
    description: String,
    brandid: String,
    category: String,
    stockQuantity: Number,
    supplierId: String,
    // image: { type: [String], required: true },

})
module.exports = mongo.model("Product", produit);
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
    brandId: String,
    supplierId: String,
    category: String,
    imageUrl: String

})
module.exports = mongo.model("Product", produit);
// Importing the mongoose module
var mongo = require("mongoose");

// Defining the Schema class
const Schema = mongo.Schema;

// Creating a new Schema for the Pieces
const Stock = new Schema({
    nom: String,
    reference: String,
    produit_id: String,
    quantité: Number,
    Description: String
})
module.exports = mongo.model("Stock", Stock);
// Importing the mongoose module
var mongo = require("mongoose");

// Defining the Schema class
const Schema = mongo.Schema;

// Creating a new Schema for the Fournisseur
const produit = new Schema({

    nom: String,
    référence: String,
    date_ajouter: Number,
    prix: Number,
    description: String,
    id_marque: String,
    id_fournisseur: String

})
module.exports = mongo.model("Produit", produit);


//
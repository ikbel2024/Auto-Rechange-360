// Importing the mongoose module
const mongoose = require("mongoose");

// Defining the Schema class
const Schema = mongoose.Schema;

// Creating a new Schema for the Vehicule
const vehiculeSchema = new Schema({
    modele: String,
    couleur: String,
    energie: String
    // Ajoutez d'autres champs si nécessaire
});

// Creating and exporting the Vehicule model
const Vehicule = mongoose.model("Vehicule", vehiculeSchema);
module.exports = Vehicule;

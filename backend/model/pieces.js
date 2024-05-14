// Importing the mongoose module
var mongo = require("mongoose");

// Defining the Schema class
const Schema = mongo.Schema;

// Creating a new Schema for the Pieces
const pieces = new Schema({
    
    nom_marque: String,
    pays: String,

})
module.exports = mongo.model("Pieces", pieces);
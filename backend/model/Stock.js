// Importing the mongoose module
var mongo = require("mongoose");

// Defining the Schema class
const Schema = mongo.Schema;

// Creating a new Schema for the Pieces
const Stock = new Schema({
    name: { type: String, required: true },
    reference: String,
    productId: String,
    quantity: Number,
    description: String
})
module.exports = mongo.model("category", Stock);
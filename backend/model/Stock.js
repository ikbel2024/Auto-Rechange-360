// Importing the mongoose module
const mongoose = require("mongoose");

// Defining the Schema class
const Schema = mongoose.Schema;

// Creating a new Schema for the Pieces
const StockSchema = new Schema({
    name: { type: String, required: true },
    reference: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model("Stock", StockSchema, "categories");
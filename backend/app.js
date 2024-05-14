// Importing required modules
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("../Auto-Rechange-360/config/dbconnection.json");
const bodyParser = require("body-parser");
const vehiculeRouter = require ("../Auto-Rechange-360/routes/vehiculee");
//const fournisseurRouter = require("../Auto-Rechange-360/routes/fournisseurr");
const path = require("path");


//twig need fournisseur root to can test in navigateur
//const { affichesocket } = require("./controller/fournisseurcontroller");
//const fournisseur = require("./model/fournisseur");
const vehicule = require("./model/vehicule");



// Connecting to MongoDB
mongoose.connect(dbConnection.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Setting up Express app
var app = express();

// Setting up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// Setting up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Using Vehicule fournisseur
app.use("/Vehicule", vehiculeRouter);

// Creating HTTP server
const server = http.createServer(app);

// Starting server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Exporting app for testing
module.exports = app;
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./config/dbconnection.json"); // Assurez-vous que ce chemin est correct
const bodyParser = require("body-parser");
const vehiculeRouter = require("./routes/vehiculee"); // Assurez-vous que ce chemin est correct
const cors = require("cors");

mongoose.connect(dbConnection.url).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

// Initialisation de l'application Express
const app = express();

// Middleware CORS avec options
const corsOptions = {
    origin: 'http://localhost:4200', // URL de votre application Angular
    optionsSuccessStatus: 200 // Réglage de statut pour les navigateurs anciens
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisation du routeur pour les véhicules
app.use("/vehiculee", vehiculeRouter);

// Création du serveur HTTP
const server = http.createServer(app);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export de l'application pour les tests
module.exports = app;

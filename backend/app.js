// Importing required modules
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dbConnection = require("../backend/config/dbconnection.json");
const bodyParser = require("body-parser");
const produitRouter = require("../backend/routes/ProduitR");
const stockRouter = require("../backend/routes/StockR");
const commandeRoutes = require('./routes/commandeRoutes');
const livraisonRoutes = require('./routes/livraisonRoutes');
const path = require("path");
const panierRoutes = require('./routes/panierRoutes'); // Import Panier routes

require('dotenv').config();

const axios = require('axios'); // Import Axios for making HTTP requests

//twig need Produit root to can test in navigateur
//const { affichesocket } = require("./controller/Produitcontroller").default;
const produit = require("./model/Produit");

// Ensure environment variable is loaded correctly
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

// Correct path to chat router
const chatRouter = require('../backend/routes/chat');

// Connecting to MongoDB
mongoose.connect(dbConnection.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Setting up Express app
var app = express();

// Configurer les options CORS pour autoriser uniquement les requêtes du projet Angular
const corsOptions = {
    origin: 'http://localhost:4200', // Autoriser uniquement les requêtes provenant de ce domaine
};

// Utiliser CORS avec les options spécifiées
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setting up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// Setting up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/commandes', commandeRoutes);
app.use('/livraisons', livraisonRoutes);
app.use('/panier', panierRoutes); // Add Panier routes

// Setting up routes
app.use("/Stock", stockRouter);
app.use("/produit", produitRouter);
app.use('/chat', chatRouter); // Ensure this is correctly integrated

// Creating HTTP server
const server = http.createServer(app);

// Setting up Socket.IO
const io = require("socket.io")(server);
io.on("connection", (socket) => {
    console.log("user connected");

    // Setting up Affiche Socket
    socket.on("aff", async(data) => {
        try {
            const result = await affichesocket(data);
            //console.log("Welcome", JSON.stringify(result));
            console.log('Received aff event with result:', result);
            io.emit("aff", result);
        } catch (error) {
            console.error('Error handling "aff" event:', error);
        }
    });

    // Listen for events from server
    socket.on('notification', (data) => {
        console.log('New notification:', data);
        // Handle notification (e.g., display it to the user)
    });

    // Listen for the 'delete' event from the client
    socket.on('delete', async({ entityType, id }) => {
        try {
            // Assuming method to delete by ID
            const deletedEntry = await produit.findByIdAndDelete(id);

            // Emit a confirmation message or updated list of entries
            socket.emit('deleteConfirmation', { entityType, deletedEntry });
        } catch (error) {
            // Handle errors
            console.error('Error deleting entry:', error.message);
            socket.emit('deleteError', { error: error.message });
        }
    });

    // Setting up msg function
    socket.on("msg", (data) => {
        // Assuming there is an 'add' function, you might need to define it
        // add(data.object);
        io.emit("msg", `${data.name}: ${data.object}`);
    });

    // For disconnecting user
    socket.on("disconnect", () => {
        console.log("user disconnect");
        io.emit("msg", "user disconnect");
    });
});

// Define NHTSA vPIC API URL
const VPIC_API_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

// Function to decode a VIN
async function decodeVIN(vin, modelYear) {
    try {
        // Make a GET request to the DecodeVin endpoint
        const response = await axios.get(`${VPIC_API_URL}/DecodeVin/${vin}`, {
            params: {
                format: 'json',
                modelyear: modelYear
            }
        });

        // Extract and return the decoded VIN data from the response
        return response.data.Results;
    } catch (error) {
        console.error('Error decoding VIN:', error.message);
        throw new Error('Failed to decode VIN');
    }
}

// Endpoint to decode a VIN
app.get('/decode-vin/:vin', async(req, res) => {
    const vin = req.params.vin;
    const modelYear = req.query.modelyear || ''; // Optional query parameter

    try {
        const decodedData = await decodeVIN(vin, modelYear);
        res.json(decodedData);
    } catch (error) {
        console.error('Error decoding VIN:', error.message);
        res.status(500).json({ error: 'Failed to decode VIN' });
    }
});

// Starting server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Exporting app for testing
module.exports = app;

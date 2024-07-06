const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const socketIO = require("socket.io");
const dotenv = require('dotenv');
const axios = require('axios');
const stripe = require('stripe')('sk_test_51PJNMnP0cq6YOYrXmkLzypwjDm1YYDrl3GiLEq6Zlb81bNPfAUpnWHbgI3tFtCKusANEl3U59NQch52AXDshHHrY00zPIpvOD8');
const geolib = require('geolib');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const commandeRoutes = require('./routes/commandeRoutes');
const livraisonRoutes = require('./routes/livraisonRoutes');
const produitRouter = require("../backend/routes/ProduitR");
const stockRouter = require("../backend/routes/StockR");
const chatRouter = require('../backend/routes/chat');
const vehiculeRouter = require("./routes/vehiculee");
const factureRouter = require("./routes/facture");
const garageRouter = require("./routes/garage");
const garageCategoryRouter = require("./routes/garageCategory");

// Load environment variables
dotenv.config();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Setting up Express app
const app = express();

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:4200', // URL of your Angular application
    optionsSuccessStatus: 200 // Setting status for old browsers
};

// Use middlewares
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setting up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// Setting up routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/commandes', commandeRoutes);
app.use('/livraisons', livraisonRoutes);
app.use("/Stock", stockRouter);
app.use("/produit", produitRouter);
app.use('/chat', chatRouter);
app.use("/vehiculee", vehiculeRouter); // New route for vehicule
app.use("/facture", factureRouter);
app.use("/garage", garageRouter);
app.use('/api', garageRouter); // Note: this may conflict with '/api' prefix in userRoutes and authRoutes
app.use('/garageCategory', garageCategoryRouter);

// Creating HTTP server
const server = http.createServer(app);

// Setting up Socket.IO
const io = socketIO(server);
io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("msgs", (data) => {
        io.emit("msgs", `${data} is connected`);
    });

    socket.on("typing", (data) => {
        console.log(data);
        io.emit("typing", `${data} is typing ....`);
    });

    socket.on("msg", (data) => {
        console.log(data);
        io.emit("msg", `${data.name}: ${data.object}`);
    });

    socket.on("aff", async(data) => {
        try {
            const result = await affichesocket(data); // Assuming affichesocket function is defined elsewhere
            console.log('Received aff event with result:', result);
            io.emit("aff", result);
        } catch (error) {
            console.error('Error handling "aff" event:', error);
        }
    });

    socket.on('notification', (data) => {
        console.log('New notification:', data);
    });

    socket.on('delete', async({ entityType, id }) => {
        try {
            const deletedEntry = await produit.findByIdAndDelete(id); // Assuming 'produit' is a mongoose model
            socket.emit('deleteConfirmation', { entityType, deletedEntry });
        } catch (error) {
            console.error('Error deleting entry:', error.message);
            socket.emit('deleteError', { error: error.message });
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnect");
        io.emit("msg", "user disconnect");
    });

    console.log('Nouvelle connexion Socket.io établie');
    socket.on('disconnect', () => {
        console.log('Connexion Socket.io terminée');
    });
});

// Utilize garageCategoryRouter with io
app.use('/garageCategory', (req, res, next) => {
    req.io = io; // Pass io to every request
    next();
}, garageCategoryRouter);

// Define NHTSA vPIC API URL
const VPIC_API_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

// Function to decode a VIN
async function decodeVIN(vin, modelYear) {
    try {
        const response = await axios.get(`${VPIC_API_URL}/DecodeVin/${vin}`, {
            params: {
                format: 'json',
                modelyear: modelYear
            }
        });
        return response.data.Results;
    } catch (error) {
        console.error('Error decoding VIN:', error.message);
        throw new Error('Failed to decode VIN');
    }
}

// Endpoint to decode a VIN
app.get('/decode-vin/:vin', async(req, res) => {
    const vin = req.params.vin;
    const modelYear = req.query.modelyear || '';
    try {
        const decodedData = await decodeVIN(vin, modelYear);
        res.json(decodedData);
    } catch (error) {
        console.error('Error decoding VIN:', error.message);
        res.status(500).json({ error: 'Failed to decode VIN' });
    }
});

// Endpoint for payment
app.post('/paiement', async(req, res) => {
    try {
        const { montant, token } = req.body;

        // Create a charge with Stripe
        const charge = await stripe.charges.create({
            amount: montant,
            currency: 'EUR', // You can change the currency as per your requirement
            description: 'Payment for garage services',
            source: token,
        });

        res.status(200).json({ message: 'Payment successful', charge });
    } catch (error) {
        console.error('Error processing payment with Stripe:', error);
        res.status(500).json({ message: 'Payment error', error: error.message });
    }
});

// Endpoint to find nearby garage categories
app.get('/findGarageCategoriesNearby', (req, res) => {
    // Implement your logic to find nearby garage categories
    res.json({ success: true, nearbyCategories: [] });
});

// Starting server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Exporting app for testing
module.exports = app;
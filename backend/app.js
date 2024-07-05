const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
const userRoutes = require('./routes/user');
const authRoutes= require ('./routes/auth'); 
const cors = require('cors');



// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: ['GET', 'POST','DELETE','PUT'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api', userRoutes);
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

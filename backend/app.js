const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
const userRoutes = require('./routes/user');

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    servicesOffered: {
        type: [String],
        required: true
    },
    employees: [{
        name: String,
        position: String,
        phone: String,
        email: String
    }],
    vehiclesUnderRepair: [{
        marke: String,
        model: String,
        year: Number,
        owner: String,
        licensePlate: String,
        issues: String
    }]
});

const Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;

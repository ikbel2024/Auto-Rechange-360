const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modèle de garage
const garageSchema = new Schema({
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
    employees: {
        type: [
            {
                name: String,
                position: String,
                phone: String,
                email: String
            }
        ],
        required: true
    },
    vehiclesUnderRepair: {
        type: [
            {
                make: String,
                model: String,
                year: Number,
                owner: String,
                licensePlate: String,
                issues: String
            }
        ],
        required: true
    },
    rating: {
        type: Number,
        default: 0 // Note moyenne du garage
    },
    reviews: [
        {
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User' // Supposons que vous avez un modèle User pour gérer les utilisateurs
            }
        }
    ]
});

const Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;

const mongoose = require('mongoose');

const GarageCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  specialization: {
    type: String,
    required: true
  },
  servicesOffered: [{
    type: String
  }],
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large']
  },
  equipment: [{
    type: String
  }],
  certifications: [{
    type: String
  }],
  pricingPolicy: {
    type: String,
    enum: ['Premium', 'Competitive', 'Budget']
  },
  customerRelations: {
    type: String,
    enum: ['Personalized', 'Efficient', 'Balanced']
  },
  // Informations de géolocalisation
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  postalCode: {
    type: String
  }
});

// Indique à Mongoose que le champ "location" utilise un index géospatial
GarageCategorySchema.index({ location: '2dsphere' });

const GarageCategory = mongoose.model('GarageCategory', GarageCategorySchema);

module.exports = GarageCategory;

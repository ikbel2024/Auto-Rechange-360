const mongoose = require('mongoose');

// Schéma de la catégorie de garage
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
  location: {
    type: String
  }
});

// Modèle de la catégorie de garage
const GarageCategory = mongoose.model('GarageCategory', GarageCategorySchema);

module.exports = GarageCategory;

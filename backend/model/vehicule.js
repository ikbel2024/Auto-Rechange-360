const mongoose = require('mongoose');

const vehiculeSchema = new mongoose.Schema({
    matricule: String,
    modele: String,
    couleur: String,
    energie: String,
    prix: Number
});

const Vehicule = mongoose.model('Vehicule', vehiculeSchema, 'vehicules'); // Assurez-vous que le nom de la collection est correct

module.exports = Vehicule;

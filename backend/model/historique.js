const mongoose = require('mongoose');

const historiqueSchema = new mongoose.Schema({
    date_entered: Date,
    release_date: Date,
    maintenance_description: String,
    matricule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule' }
});

const Historique = mongoose.model('Historique', historiqueSchema);

module.exports = Historique;

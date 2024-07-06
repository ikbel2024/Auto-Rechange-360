const Historique = require("../model/historique");
const Vehicule = require("../model/vehicule");

async function addHistorique(req, res, next) {
    try {
        const { date_entered, release_date, maintenance_description, matricule } = req.body;
        const vehicule = await Vehicule.findOne({ matricule: matricule });

        if (!vehicule) {
            return res.status(404).json({ error: "Vehicule not found" });
        }

        const newHistorique = new Historique({
            date_entered,
            release_date,
            maintenance_description,
            matricule: vehicule._id // Utilisez l'ID du véhicule trouvé
        });

        const savedHistorique = await newHistorique.save();
        res.status(200).json(savedHistorique);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to show historiques by matricule
async function showHistoriques(req, res, next) {
    try {
        const { matricule } = req.params;
        const vehicule = await Vehicule.findOne({ matricule: matricule });

        if (!vehicule) {
            return res.status(404).json({ error: "Vehicule not found" });
        }

        const historiques = await Historique.find({ matricule: vehicule._id }).populate('matricule');
        res.status(200).json(historiques);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


// Function to get maintenance days and show alert if needed
async function getMaintenanceDays(req, res, next) {
    try {
        const { vehiculeId } = req.params;
        const historiques = await Historique.find({ matricule: vehiculeId }).populate('matricule');

        const result = historiques.map(historique => {
            const dateEntered = new Date(historique.date_entered);
            const releaseDate = new Date(historique.release_date);
            const diffTime = Math.abs(releaseDate - dateEntered);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Add an alert if the maintenance period exceeds 3 days
            const alert = diffDays > 3 ? 'Période d\'entretien dépasse 3 jours, le client doit payer !!' : null;

            return {
                ...historique._doc,
                maintenance_days: diffDays,
                alert: alert
            };
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    addHistorique,
    showHistoriques,
    getMaintenanceDays
};

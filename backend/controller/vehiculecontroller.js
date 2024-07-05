const Vehicule = require("../model/vehicule");

async function add(req, res, next) {
    try {
        const vehicule = new Vehicule(req.body);
        await vehicule.save();
        console.log("Véhicule ajouté :", vehicule); 
        res.status(200).send("Véhicule ajouté");
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur interne du serveur");
    }
}


async function show(req, res, next) {
    try {
        const data = await Vehicule.find();
        const vehiculesWithImages = data.map(vehicule => {
            const vehiculeObj = vehicule.toObject();
            if (vehiculeObj.modele) {
                vehiculeObj.image = `images/${vehiculeObj.modele.toLowerCase().replace(/ /g, '')}.jpg`;
            } else {
                vehiculeObj.image = 'images/default.jpg'; // ou une autre image par défaut
            }
            return vehiculeObj;
        });
        res.json(vehiculesWithImages);
    } catch (err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
        }
    }
}


async function deleteVehicule(req, res, next) {
    try {
        console.log(`Attempting to delete vehicle with ID: ${req.params.id}`);
        const data = await Vehicule.findByIdAndDelete(req.params.id);
        if (data) {
            res.status(200).send("Véhicule supprimé avec succès");
        } else {
            res.status(404).send("Véhicule non trouvé");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur interne du serveur");
    }
}

// Function to update a Vehicule
async function update(req, res, next) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await Vehicule.findByIdAndUpdate(id, updateData);
        res.send("Véhicule mis à jour");
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
        }
    }
}

// Function to find a Vehicule by ID
async function findVehicule(req, res, next) {
    try {
        const data = await Vehicule.findById(req.params.id);
        res.send(data);
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
        }
    }
}

// Function to find a Vehicule by Modele
async function findVehiculeModele(req, res, next) {
    try {
        const data = await Vehicule.findOne(req.params);
        res.send(data);
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
        }
    }
}

// Function to search for vehicles based on multiple criteria
async function searchVehicles(req, res, next) {
    try {
        const criteria = req.query;
        const data = await Vehicule.find(criteria);
        res.json(data);
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = {
    add,
    show,
    deleteVehicule,
    update,
    findVehicule,
    findVehiculeModele,
    searchVehicles
};

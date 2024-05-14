const vehicule = require("../model/vehicule");
const Vehicule = require("../model/vehicule");
const Piece = require("../model/pieces");

//_________________________________________________________________1:First _Part (Vehicule-Crud)_______________________________________________________________________________

// Function to add a new Vehicule

async function add(req, res, next) {
    try {
        const vehicule = new Vehicule(req.body);
        await vehicule.save();
        res.status(200).send("Véhicule ajouté");
    } catch (err) {
        console.log(err);
    }
}


// Function to get all  the Fournisseurs
async function show(req, res, next) {
    try {
        const data = await Vehicule.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

// Function to delete a Vehicule
async function deleteVehicule(req, res, next) {
    try {
        const data = await Vehicule.findByIdAndDelete(req.params.id);
        res.send("removed");
    } catch (err) {
        // Handle errors here
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to update a Fournisseur
async function update(req, res, next) {
    try {
        const data = await Vehicule.findByIdAndUpdate(req.params.id, req.body);
        res.send("updated");
    } catch (err) {}
}




// Function to find a Fournisseur by ID
async function findVehicule(req, res, next) {
    try {
        const data = await Vehicule.findById(req.params.id);
        res.send(data);
    } catch (err) {}
}





//________________________________________________________________________________________________________________________________________________________________________________


module.exports = {
    add,
    show,
    deleteVehicule,
    update,
    findVehicule
    //affichesocket


};


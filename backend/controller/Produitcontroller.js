const produit = require("../model/Produit");
const Produit = require("../model/Produit");
const Stock = require("../model/Stock");




//_________________________________________________________________1:First _Part (Produit-Crud)_______________________________________________________________________________


// Function to add a new Produit
async function addPR(req, res, next) {
    try {
        const produit = new Produit(req.body);
        await produit.save();
        res.status(200).send("Produit add");
    } catch (err) {
        console.log(err);
    }
}


// Function to delete a Produit
async function deletePR(req, res, next) {
    try {
        const data = await Produit.findByIdAndDelete(req.params.id);
        res.send("removed");
    } catch (err) {
        // Handle errors here
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to update a Produit
async function updatePR(req, res, next) {
    try {
        const data = await Produit.findByIdAndUpdate(req.params.id, req.body);
        res.send("updated");
    } catch (err) {}
}



// Function to get all  the Produit
async function showPR(req, res, next) {
    try {
        const data = await Produit.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}


// Function to find a Produit by ID
async function findPR(req, res, next) {
    try {
        const data = await produit.findById(req.params.id);
        res.send(data);
    } catch (err) {}
}


// Function to find a Produit by name
async function findProduitName(req, res, next) {
    try {
        const data = await produit.findOne(req.params);
        res.send(data);
    } catch (err) {}
}






//_________________________________________________________________2:Second_Part (Socket)_________________________________________________________________________________________

/*

// Inside the affichesocket function
async function affichesocket(data) {
    const { entityType, id } = data;

    try {
        let result;

        // Check if id is provided, if not, fetch all data
        if (!id) {
            result = await fetchAllDetails(entityType);
        } else if (entityType.toLowerCase() === 'produit') {
            result = await fetchFournisseurDetails(id);
        } else if (entityType.toLowerCase() === 'pieces') {
            result = await fetchPiecesDetails(id);
        } else {
            throw new Error('Invalid entityType');
        }

        return result;
    } catch (error) {
        console.error('Error in affichesocket:', error);
        throw error; // Propagate the error to handle it on the client side
    }
}

// Fetch all details for the given entityType
async function fetchAllDetails(entityType) {
    try {
        let result;

        if (entityType.toLowerCase() === 'produit') {
            result = await Produit.find();
        } else if (entityType.toLowerCase() === 'pieces') {
            result = await Piece.find();
        } else {
            throw new Error('Invalid entityType');
        }

        return { data: result }; // Wrap the result in an object
    } catch (error) {
        console.error('Error in fetchAllDetails:', error);
        throw error; // Propagate the error to handle it on the client side
    }
}
*/
// Fetch Fournisseur details by ID
async function fetchFournisseurDetails(id) {
    return await Produit.findById(id);
}

// Fetch Pieces details by ID
//async function fetchPiecesDetails(id) {
//return await Piece.findById(id);
//}



//________________________________________________________________________________________________________________________________________________________________________________




module.exports = {
    addPR,
    deletePR,
    updatePR,
    showPR,
    findPR,
    findProduitName,
    //affichesocket


};
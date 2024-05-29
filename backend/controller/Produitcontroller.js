const produit = require("../model/Produit");
const Produit = require("../model/Produit");
const Stock = require("../model/Stock");




//_________________________________________________________________1:First _Part (Produit-Crud)_______________________________________________________________________________


// Function to add a new Produit
async function addPR(req, res, next) {
    try {
        const produit = new Produit(req.body);

        await produit.save();
        res.status(200).send("Product add");
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

async function updatePR(req, res, next) {
    try {
        const data = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).send("Product not found");
        }
        res.send("updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
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


// Function to find a Produit by name
async function findProduitName(req, res, next) {
    try {
        const data = await Produit.findOne({ name: req.params.name });
        if (!data) {
            return res.status(404).send("Product not found");
        }
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to find Produit by fournisseur (supplier)
async function findProduitByFournisseur(req, res, next) {
    try {
        const data = await Produit.find({ supplierId: req.params.supplierId });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to paginate Produit
async function paginateProduit(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const data = await Produit.find().skip(skip).limit(limit);
        const count = await Produit.countDocuments();

        res.json({
            total: count,
            page: page,
            pages: Math.ceil(count / limit),
            data: data
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to get all unique Brand IDs
async function getUniqueBrandIds(req, res, next) {
    try {
        const data = await Produit.distinct("brandId");
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to update multiple Produits at once
async function updateMultipleProduits(req, res, next) {
    try {
        const { ids, updateData } = req.body;
        const data = await Produit.updateMany({ _id: { $in: ids } }, updateData);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to delete multiple Produits by IDs
async function deleteMultipleProduits(req, res, next) {
    try {
        const { ids } = req.body;
        const data = await Produit.deleteMany({ _id: { $in: ids } });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}



// Function to count the number of Produits
async function countProduits(req, res, next) {
    try {
        const count = await Produit.countDocuments();
        res.json({ count: count });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

async function findProduitByNameAndFournisseur(req, res) {
    try {
        const { name, supplierId } = req.query;
        console.log('Query parameters:', req.query); // Debugging log
        const data = await Produit.find({ name: name, supplierId: supplierId });
        console.log('Query result:', data); // Debugging log
        if (data.length === 0) {
            return res.status(404).send("Produit not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


// Function to sort Produits
async function sortProduits(req, res, next) {
    try {
        const { sortBy = 'name', order = 'asc' } = req.query; // Default sorting by name in ascending order
        const sortOrder = order === 'desc' ? -1 : 1; // Set sort order

        const data = await Produit.find().sort({
            [sortBy]: sortOrder
        });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
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
//async function fetchFournisseurDetails(id) {
//return await Produit.findById(id);
//}

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
    // affichesocket,
    findProduitByFournisseur,
    paginateProduit,
    countProduits,
    findProduitByNameAndFournisseur,
    getUniqueBrandIds,
    updateMultipleProduits,
    deleteMultipleProduits,
    sortProduits


};
const Stock = require("../model/Stock");


//_________________________________________________________________1:First _Part (Stock-Crud)_______________________________________________________________________________


// Function to add a new Stock
async function add(req, res, next) {
    try {
        const stock = new Stock(req.body);
        await stock.save();
        res.status(200).send("Stock add");
    } catch (err) {
        console.log(err);
    }
}





// Function to delete a Stock
async function deleteS(req, res, next) {
    try {
        const data = await Stock.findByIdAndDelete(req.params.id);
        res.send("removed");
    } catch (err) {
        // Handle errors here
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


// Function to update a Stock
async function updateS(req, res, next) {
    try {
        const data = await Stock.findByIdAndUpdate(req.params.id, req.body);
        res.send("updated");
    } catch (err) {}
}


// Function to get all  the Pieces
async function showS(req, res, next) {
    try {
        const data = await Stock.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

// Function to find a Piece by ID
async function findS(req, res, next) {
    try {
        const data = await Stock.findById(req.params.id);
        res.send(data);
    } catch (err) {}
}


// Function to find a Piece by Name
async function findSN(req, res, next) {
    try {
        const data = await Stock.findOne(req.params);
        res.send(data);
    } catch (err) {}
}

// Function to find Stock by produit_id
async function findStockByProduitId(req, res, next) {
    try {
        const data = await Stock.find({ produit_id: req.params.produitId });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to update multiple Stock at once
async function updateMultipleStock(req, res, next) {
    try {
        const { ids, updateData } = req.body;
        const data = await Stock.updateMany({ _id: { $in: ids } }, updateData);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to delete multiple Stock by IDs
async function deleteMultipleStock(req, res, next) {
    try {
        const { ids } = req.body;
        const data = await Stock.deleteMany({ _id: { $in: ids } });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

//____________________________________________________________________2: seconde Part (Socket)______________________________________________________________________________________




//__________________________________________________________________________________________________________________________________________________________________________________

module.exports = {
    add,
    deleteS,
    updateS,
    showS,
    findS,
    findSN,
    findStockByProduitId,
    updateMultipleStock,
    deleteMultipleStock



};
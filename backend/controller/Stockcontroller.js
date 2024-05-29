const Stock = require("../model/Stock");
//const Stock = require("../model/Produit");

// Function to add a new Stock
async function add(req, res, next) {
    try {
        const stock = new Stock(req.body);
        await stock.save();
        res.status(200).send("category added successfully");
    } catch (error) {
        console.error("Error adding stock:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Function to delete a Stock by ID
async function deleteS(req, res, next) {
    try {
        const deletedStock = await Stock.findByIdAndDelete(req.params.id);
        if (!deletedStock) {
            return res.status(404).send("category not found");
        }
        res.send("category removed successfully");
    } catch (error) {
        console.error("Error deleting stock:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Function to update a Stock by ID
async function updateS(req, res, next) {
    try {
        const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStock) {
            return res.status(404).send("category not found");
        }
        res.send("category updated successfully");
    } catch (error) {
        console.error("Error updating stock:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Function to get all Stocks
async function showS(req, res, next) {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        console.error("Error fetching stocks:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Function to find a Stock by ID
async function findS(req, res, next) {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).send("category not found");
        }
        res.json(stock);
    } catch (error) {
        console.error("Error finding stock:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Function to find a Stock by Name
async function findSN(req, res, next) {
    try {
        const stock = await Stock.findOne({ name: req.params.name });
        if (!stock) {
            return res.status(404).send("category not found");
        }
        res.json(stock);
    } catch (error) {
        console.error("Error finding stock:", error);
        res.status(500).send("Internal Server Error");
    }
}


// Function to find Stock by product_id
async function findStockByProduitId(req, res, next) {
    try {
        const stocks = await Stock.find({ productId: req.params.productId });
        res.json(stocks);
    } catch (error) {
        console.error("Error finding category by product ID:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function updateMultipleStock(req, res, next) {
    try {
        const { ids, updateData } = req.body;
        console.log("Received update request for IDs:", ids);

        if (!Array.isArray(ids) || ids.length === 0) {
            console.error("Invalid IDs provided:", ids);
            return res.status(400).json({ error: "Ids must be a non-empty array" });
        }

        const updatedStocks = [];

        for (const id of ids) {
            // Update each stock individually
            const updatedStock = await Stock.findByIdAndUpdate(id, updateData, { new: true });
            updatedStocks.push(updatedStock);
        }

        // Send the updated stocks as a response
        console.log("category updated successfully:", updatedStocks);
        res.json({ message: "category updated successfully", updatedStocks });
    } catch (error) {
        console.error("Error updating multiple stocks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteMultipleStock(req, res, next) {
    try {
        const { ids } = req.body;
        console.log("Received delete request for IDs:", ids);

        if (!Array.isArray(ids) || ids.length === 0) {
            console.error("Invalid IDs provided:", ids);
            return res.status(400).json({ error: "Ids must be a non-empty array" });
        }

        // Delete multiple stocks by IDs
        const result = await Stock.deleteMany({ _id: { $in: ids } });
        console.log("Stocks deleted successfully:", result);
        res.json({ message: "Stocks deleted successfully", result });
    } catch (error) {
        console.error("Error deleting multiple stocks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Function to count the number of Stocks
async function countStocks(req, res, next) {
    try {
        const count = await Stock.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to calculate the total stock quantity
async function calculateTotalStockQuantity(req, res, next) {
    try {
        // Query all stocks from the database
        const stocks = await Stock.find();

        // Log the retrieved stocks for debugging
        console.log("Retrieved category:", stocks);

        // Calculate the total quantity by summing up the quantities of all stocks
        let totalQuantity = 0;
        for (const stock of stocks) {
            totalQuantity += stock.quantity;
        }

        // Log the total quantity for debugging
        console.log("Total quantity:", totalQuantity);

        // Send the total quantity as a response
        res.json({ totalQuantity });
    } catch (error) {
        console.error("Error calculating total category quantity:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}





module.exports = {
    add,
    deleteS,
    updateS,
    showS,
    findS,
    findSN,
    findStockByProduitId,
    updateMultipleStock,
    deleteMultipleStock,
    countStocks,
    calculateTotalStockQuantity
};
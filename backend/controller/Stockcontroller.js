const Stock = require("../model/Stock");
//const Stock = require("../model/Produit");


// Function to add a new Stock
async function addStock(req, res, next) {
    try {
        const requiredFields = ['description', 'quantity', 'productId', 'reference', 'name'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send(`${field} is required`);
            }
        }

        const stock = new Stock(req.body);
        await stock.save();
        res.status(200).send("Stock added successfully");
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
async function showStock(req, res, next) {
    try {
        const stocks = await Stock.find();
        console.log("Retrieved data:", stocks); // Log retrieved data for debugging
        res.json(stocks);
    } catch (err) {
        console.error("Error retrieving stock:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}




// Function to find a Stock by ID
async function findS(req, res) {
    const { id } = req.params;

    try {
        const stock = await Stock.findById(id);

        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }

        res.status(200).json(stock);
    } catch (error) {
        console.error('Error finding stock:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        console.log("Stocks updated successfully:", updatedStocks);
        res.json({ message: "Stocks updated successfully", updatedStocks });
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
        // Count the total number of documents
        const count = await Stock.countDocuments();

        // Aggregate to calculate the total quantity
        const aggregateResult = await Stock.aggregate([{
            $group: {
                _id: null,
                totalQuantity: { $sum: '$quantity' }
            }
        }]);

        // Extract the total quantity from the aggregation result
        const totalQuantity = aggregateResult.length > 0 ? aggregateResult[0].totalQuantity : 0;

        console.log(`Total stock count: ${count}`);
        console.log(`Total quantity: ${totalQuantity}`);

        res.json({ count, totalQuantity });
    } catch (err) {
        console.error('Error counting stocks:', err);
        res.status(500).send('Internal Server Error');
    }
}


// Function to calculate the total stock quantity with names
async function calculateTotalStockQuantity(req, res, next) {
    try {
        // Query all stocks from the database
        const stocks = await Stock.find();

        // Initialize an array to store stock details (name and quantity)
        let stockDetails = [];

        // Iterate through each stock to retrieve name and quantity
        for (const stock of stocks) {
            stockDetails.push({
                name: stock.name,
                quantity: stock.quantity
            });
        }

        // Calculate the total quantity by summing up the quantities of all stocks
        let totalQuantity = 0;
        for (const stock of stocks) {
            totalQuantity += stock.quantity;
        }

        // Log the total quantity for debugging
        console.log("Total quantity:", totalQuantity);

        // Send the total quantity and stock details as a response
        res.json({ totalQuantity, stocks: stockDetails });
    } catch (error) {
        console.error("Error calculating total stock quantity:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



// Function to delete a category by name
async function deleteCategorieByNameS(req, res, next) {
    try {
        const { name } = req.params;
        console.log('Deleting category:', name); // Check if name is correctly received
        const data = await Stock.findOneAndDelete({ name: name });
        if (!data) {
            return res.status(404).json({ message: "The specified category was not found." });
        }
        res.json({ message: "The category has been successfully deleted." });
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ message: "An error occurred on the server. Please try again later." });
    }
}




module.exports = {
    addStock,
    deleteS,
    updateS,
    showStock,
    findS,
    findSN,
    findStockByProduitId,
    updateMultipleStock,
    deleteMultipleStock,
    countStocks,
    calculateTotalStockQuantity,
    deleteCategorieByNameS
};
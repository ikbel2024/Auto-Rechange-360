const express = require("express");
const router = express.Router();
const Stockcontroller = require("../controller/Stockcontroller");

// Define your Stock routes

router.post('/addS', Stockcontroller.addStock);
router.delete('/deleteS/:id', Stockcontroller.deleteS);
router.put('/updateS/:id', Stockcontroller.updateS);
router.get('/showS', Stockcontroller.showStock);
router.get('/findS/:id', Stockcontroller.findS);
router.get('/findSN/:name', Stockcontroller.findSN);

// Find stock by produit_id
router.get('/produit/:productId', Stockcontroller.findStockByProduitId);


// Update multiple Stock at once
router.put('/updateMultiple', Stockcontroller.updateMultipleStock);

// Delete multiple Stock by IDs
router.delete('/deleteMultiple', Stockcontroller.deleteMultipleStock);

// Route to count the number of stocks
router.get('/countS', Stockcontroller.countStocks);

// Route to calculate total stock quantity
router.get('/totalQuantity', Stockcontroller.calculateTotalStockQuantity);

// Route to delete category by name
router.delete('/deleteByNameS/:name', Stockcontroller.deleteCategorieByNameS);


module.exports = router;
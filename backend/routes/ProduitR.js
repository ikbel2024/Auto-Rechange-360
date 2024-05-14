const express = require("express");
const router = express.Router();

const Produitcontroller = require("../controller/Produitcontroller");
const Stockcontroller = require("../controller/Stockcontroller");
//const validate = require("../middl/validate").default;

const { json } = require("body-parser");

router.get('/', function(req, res, next) {
    res.send('Hello , Test  ');
});

router.get('/Produit', (req, res, next) => {
    res.render("Produit");

})


//_________________Produit___________________________________
//, validate
router.post('/add', Produitcontroller.addPR);

router.delete('/delete/:id', Produitcontroller.deletePR);

router.put('/update/:id', Produitcontroller.updatePR);

router.get('/show', Produitcontroller.showPR);

router.get('/find/:id', Produitcontroller.findPR);

router.get('/findName/name', Produitcontroller.findProduitName);
// Find a product by name
router.get('/name/:name', Produitcontroller.findProduitName);
// Find products by Fournisseur
router.get('/fournisseur/:fournisseurId', Produitcontroller.findProduitByFournisseur);
// Paginate products
router.get('/paginate', Produitcontroller.paginateProduit);
// Count all products
router.get('/count', Produitcontroller.countProduits);
// Find a product by name and category
router.get('/search', Produitcontroller.findProduitByNameAndFournisseur);
// Get all unique Brand IDs
router.get('/brands', Produitcontroller.getUniqueBrandIds);

// Update multiple Produits at once
router.put('/updateMultiple', Produitcontroller.updateMultipleProduits);

// Delete multiple Produits by IDs
router.delete('/deleteMultiple', Produitcontroller.deleteMultipleProduits);

//___________________Srock________________________________________

router.post('/addS', Stockcontroller.add);
router.delete('/deleteS/:id', Stockcontroller.deleteS);
router.put('/updateS/:id', Stockcontroller.updateS);
router.get('/showS', Stockcontroller.showS);
router.get('/findS/:id', Stockcontroller.findS);
router.get('/findSN/:name', Stockcontroller.findSN);

// Find stock by produit_id
router.get('/produit/produitId', Stockcontroller.findStockByProduitId);

// Update multiple Stock at once
router.put('/updateMultiple', Stockcontroller.updateMultipleStock);

// Delete multiple Stock by IDs
router.delete('/deleteMultiple', Stockcontroller.deleteMultipleStock);


//_________________Socket________________________________________

//router.put();


router.get("/Stock", (req, res, next) => {
    res.render("Stock");
});
module.exports = router;
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
router.put('/update /: id ', Produitcontroller.updatePR);
router.get('/show', Produitcontroller.showPR);
router.get('/find/:id', Produitcontroller.findPR);
router.get('/findName/:name', Produitcontroller.findProduitName);

//___________________Srock________________________________________

router.post('/addS', Stockcontroller.add);
router.delete('/deleteS/:id', Stockcontroller.deleteS);
router.put('/updateS/:id', Stockcontroller.updateS);
router.get('/showS', Stockcontroller.showS);
router.get('/findS/:id', Stockcontroller.findS);
router.get('/findSN/:name', Stockcontroller.findSN);

//_________________Socket________________________________________

//router.put();


router.get("/Stock", (req, res, next) => {
    res.render("Stock");
});
module.exports = router;
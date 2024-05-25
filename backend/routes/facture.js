const express = require("express");
const router = express.Router();
const facturecontroller = require("../controller/facturecontroller");


const { json } = require("body-parser");
//-------------Facture-------------------
router.post('/add',  facturecontroller.add);
router.delete('/delete/:id', facturecontroller.deleteFacture);
router.put('/update/:id', facturecontroller.update);
router.get('/show', facturecontroller.show);
router.get('/getbyid/:id', facturecontroller.getbyid);






router.get("/facture", (req, res, next) => {
    res.render("Facture");
});



























module.exports = router;
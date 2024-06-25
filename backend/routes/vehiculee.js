const express = require("express");
const router = express.Router();
const vehiculecontroller = require("../controller/vehiculecontroller");
const historiquecontroller = require("../controller/historiquecontroller");

router.get('/', function(req, res, next) {
    res.send('Hello , Test');
});

router.get('/vehicule', (req, res, next) => {
    res.render("Vehicule");
});

//_______________________________Véhicule___________________________________

router.post('/add', vehiculecontroller.add);
router.delete('/delete/:id', vehiculecontroller.deleteVehicule);
router.put('/update/:id', vehiculecontroller.update);
router.get('/show', vehiculecontroller.show);
router.get('/find/:id', vehiculecontroller.findVehicule);
router.get('/findName/:modele', vehiculecontroller.findVehiculeModele);
router.get('/search', vehiculecontroller.searchVehicles);

//______________________________Historique_entretien___________________________

router.post('/addHistorique', historiquecontroller.addHistorique);
router.get('/showHistoriques/:matricule', historiquecontroller.showHistoriques);
router.get('/getMaintenanceDays/:id', historiquecontroller.getMaintenanceDays);

//________________________________Socket________________________________________

router.get("/pieces", (req, res, next) => {
    res.render("Pieces");
});

module.exports = router;

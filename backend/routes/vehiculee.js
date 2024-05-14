const express = require("express");
const router = express.Router();
const vehiculecontroller = require("../controller/vehiculecontroller");
const piececontroller = require("../controller/piececontroller");

const { json } = require("body-parser");

router.get('/', function(req, res, next) {
    res.send('Hello , Test  ');
});

router.get('/vehicule', (req, res, next) => {
    res.render("Vehicule");
})

//_________________Véhicule___________________________________

router.post('/add', vehiculecontroller.add);
router.delete('/delete/:id', vehiculecontroller.deleteVehicule);
router.put('/update/:id', vehiculecontroller.update);
router.get('/show', vehiculecontroller.show);
router.get('/find/:id', vehiculecontroller.findVehicule);

//_________________Piece________________________________________


router.post('/addP', piececontroller.addP);
router.delete('/deleteP/:id', piececontroller.deleteP);
router.put('/updateP/:id', piececontroller.updateP);
router.get('/showP', piececontroller.showP);
router.get('/findP/:id', piececontroller.findP);


//_________________Socket________________________________________

//router.put();

router.get("/pieces", (req, res, next) => {
    res.render("Pieces");
});
module.exports = router;
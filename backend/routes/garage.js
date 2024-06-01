const express = require("express");
const router = express.Router();
const garagecontroller = require("../controller/garagecontroller");




const { json } = require("body-parser");
//-------------Garage-------------------
router.post('/add',  garagecontroller.add);
router.put('/update/:id', garagecontroller.update);
router.get('/show', garagecontroller.show);
router.get('/getbyid/:id', garagecontroller.getbyid);
router.delete('/delete/:id', garagecontroller.deleteGarage);
// Endpoint pour planifier un rendez-vous pour un garage spécifique
router.post('/:garageId/appointments', garagecontroller.scheduleAppointment);
router.post('/paiement', garagecontroller.handlePayment);
router.get('/garage/statistics/by-city',garagecontroller.getGarageStatisticsByCity);
router.post('/:garageId/addReview', garagecontroller.addReview);


    





router.get("/garage", (req, res, next) => {
    res.render("Garage");
});

module.exports = router;
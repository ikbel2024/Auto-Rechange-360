const express = require("express");
const router = express.Router();
const garageCategorycontroller = require("../controller/garageCategorycontroller");


const { json } = require("body-parser");
//-------------GarageCategory-------------------
router.post('/add',  garageCategorycontroller.add);
router.post('/adds', garageCategorycontroller.addgarageCategory);
router.put('/update/:id', garageCategorycontroller.update);
router.get('/show', garageCategorycontroller.show);
router.get('/getbyid/:id', garageCategorycontroller.getbyid);
router.delete('/delete/:id', garageCategorycontroller.deleteGarageCategory);
router.get('/search', garageCategorycontroller.searchByServices);
router.get('/findGarageCategoriesNearby', garageCategorycontroller.findGarageCategoriesNearby);



router.get("/garageCategory", (req, res, next) => {
    res.render("GarageCategory");
});

module.exports = router;
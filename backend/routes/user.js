const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const user = require("../models/user");

router.post("/add", userController.add);
router.get("/getall", userController.getall);
router.get("/getbyid/:id", userController.getbyid);
router.delete("/deletebyid/:id", userController.deletebyid);
router.get("/user", (req, res, next) => {
    res.render("User");});

    const userCtrl = require('../controllers/usercontroller');

//router.post('/signup', userController.signup);
//router.post('/login', user.login);

module.exports = router;
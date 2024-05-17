const express = require("express");
const router = express.Router();
const roleController = require("../controllers/rolecontroller");

router.post("/add", roleController.add);
router.get("/getall", roleController.getall);
router.get("/getbyid/:id", roleController.getbyid);
router.delete("/deletebyid/:id", roleController.deletebyid);
router.get("/role", (req, res, next) => {
    res.render("Role");
});




module.exports = router;
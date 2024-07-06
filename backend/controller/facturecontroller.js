const Facture = require("../model/facture");

// Function to add a new Facture
async function add(req, res, next) {
    try {
      console.log("body :" + JSON.stringify(req.body));
      const facture= new Facture(req.body);
      await facture.save();
      res.send("facture add");
    } catch (err) {
      console.log(err);
    }
  }

// Function to delete a Facture
async function deleteFacture(req, res, next) {
  try {
    const data = await Facture.findByIdAndDelete(req.params.id);
    res.send("removed");
  } catch (err) {
    // Handle errors here
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
// Function to update a Facture
async function update(req, res, next) {
  try {
    const data = await Facture.findByIdAndUpdate(req.params.id, req.body);
    res.send("updated");
  } catch (err) {}
}
// Function to get all  the Factures
async function show(req, res, next) {
  try {
    const data = await Facture.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}
// Function to find a Facture by ID
async function getbyid(req, res, next) {
    try {
      const data = await Facture.findById(req.params.id);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
module.exports = {
  add,
  deleteFacture,
  update,
  show,
  getbyid,
};

const Garage= require("../model/garage");
const Appointment = require('../model/appointment');
const stripe = require('stripe')('sk_test_51PJNMnP0cq6YOYrXmkLzypwjDm1YYDrl3GiLEq6Zlb81bNPfAUpnWHbgI3tFtCKusANEl3U59NQch52AXDshHHrY00zPIpvOD8');





// Function to add a new Garage
async function add(req, res, next) {
    try {
      console.log("body :" + JSON.stringify(req.body));
      const garage= new Garage(req.body);
      await garage.save();
      res.send("garage add");
    } catch (err) {
      console.log(err);
    }
  }
  // Function to update a Garage
async function update(req, res, next) {
    try {
      const data = await Garage.findByIdAndUpdate(req.params.id, req.body);
      res.send("updated");
    } catch (err) {}
  }
  // Function to get all  Garages
async function show(req, res, next) {
    try {
      const data = await Garage.find();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
  // Function to find a Garage by ID
async function getbyid(req, res, next) {
    try {
      const data = await Garage.findById(req.params.id);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
  // Function to delete a Garage
async function deleteGarage(req, res, next) {
    try {
      const data = await Garage.findByIdAndDelete(req.params.id);
      res.send("removed");
    } catch (err) {
      // Handle errors here
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
  // Fonction pour planifier un rendez-vous
const scheduleAppointment = async (req, res) => {
  try {
      const { clientName, clientPhone, appointmentDate, serviceRequired } = req.body;
      const garageId = req.params.garageId; // Supposons que vous obteniez l'ID du garage à partir des paramètres de requête ou du token d'authentification

      const appointment = new Appointment({
          clientName,
          clientPhone,
          appointmentDate,
          serviceRequired,
          garage: garageId
      });

      await appointment.save();
      res.status(201).json(appointment);
  } catch (error) {
      res.status(400).json({ message: 'Erreur lors de la planification du rendez-vous', error: error.message });
  }
};
// Fonction pour créer une charge avec Stripe
const createStripeCharge = async (montant, token) => {
  try {
      // Création d'une charge avec Stripe
      const charge = await stripe.charges.create({
          amount: montant,
          currency: 'EUR', // Vous pouvez modifier la devise selon vos besoins
          description: 'Paiement pour les services de garage',
          source: token,
      });
      return charge;
  } catch (error) {
      console.error('Erreur lors de la création de la charge avec Stripe:', error);
      throw new Error('Erreur lors du paiement');
  }
};
// Fonction pour gérer le paiement avec Stripe
const handlePayment = async (req, res) => {
  try {
      const { montant, token } = req.body;

      // Créer une charge avec Stripe
      const charge = await stripe.charges.create({
          amount: montant,
          currency: 'EUR', // Vous pouvez modifier la devise selon vos besoins
          description: 'Paiement pour les services de garage',
          source: token,
      });

      // Envoyer une réponse avec les détails de la charge
      res.status(200).json({ message: 'Paiement réussi', charge });
  } catch (error) {
      console.error('Erreur lors du paiement avec Stripe:', error);
      res.status(500).json({ message: 'Erreur lors du paiement', error: error.message });
  }
};

  module.exports = {
    add,
    update,
    show,
    getbyid,
    deleteGarage,
    scheduleAppointment,
    createStripeCharge,
    handlePayment,
    
  };
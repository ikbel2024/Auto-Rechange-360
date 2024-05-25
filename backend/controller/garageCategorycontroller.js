const GarageCategory= require("../model/garageCategory");





// Function to add a new GarageCategory
async function add(req, res, next) {
    try {
      console.log("body :" + JSON.stringify(req.body));
      const garageCategory= new GarageCategory(req.body);
      await garageCategory.save();
      res.send("garageCategory add");
    } catch (err) {
      console.log(err);
    }
  }
  // Function to update a GarageCategory
async function update(req, res, next) {
    try {
      const data = await GarageCategory.findByIdAndUpdate(req.params.id, req.body);
      res.send("updated");
    } catch (err) {}
  }
   // Function to get all  GarageCategory
async function show(req, res, next) {
    try {
      const data = await GarageCategory.find();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
  // Function to find a GarageCategory by ID
async function getbyid(req, res, next) {
    try {
      const data = await GarageCategory.findById(req.params.id);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
  // Function to delete a GarageCategory
async function deleteGarageCategory(req, res, next) {
    try {
      const data = await GarageCategory.findByIdAndDelete(req.params.id);
      res.send("removed");
    } catch (err) {
      // Handle errors here
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
  

// Fonction pour rechercher les catégories de garage en fonction des services offerts
const searchByServices = async (req, res) => {
  try {
    // Récupérer les services offerts à partir des paramètres de requête
    const { services } = req.query;

    // Vérifier si aucun service n'est fourni
    if (!services) {
      return res.status(400).json({ message: 'Veuillez fournir au moins un service pour la recherche.' });
    }

    // Séparer les services fournis en un tableau
    const servicesArray = services.split(',');

    // Utiliser une requête MongoDB pour rechercher les catégories de garage contenant tous les services fournis
    const garageCategories = await GarageCategory.find({ servicesOffered: { $all: servicesArray } });

    if (garageCategories.length === 0) {
      return res.status(404).json({ message: 'Aucune catégorie de garage trouvée pour les services spécifiés.' });
    }

    res.status(200).json({ message: 'Catégories de garage trouvées avec succès.', data: garageCategories });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la recherche des catégories de garage.', error: err.message });
  }
};

// Fonction pour envoyer une notification en temps réel pour une nouvelle catégorie de garage
const sendCategoryNotification = (io, category) => {
    io.emit('categoryAdded', category);
    console.log('Notification envoyée pour une nouvelle catégorie ajoutée:', category);
};

// Fonction pour ajouter une nouvelle catégorie de garage
const addgarageCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await GarageCategory.create(categoryData);

        // Envoyer une notification en temps réel
        sendCategoryNotification(req.io, newCategory); // Utiliser req.io au lieu de io

        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout de la catégorie de garage', error: err.message });
    }
};










  module.exports = {add,update,show,getbyid,deleteGarageCategory,searchByServices, addgarageCategory,

    
  };
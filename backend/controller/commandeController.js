const Commande = require('../model/commande');

// Créer une nouvelle commande
exports.createCommande = async (req, res) => {
    try {
        const newCommande = new Commande(req.body);
        const savedCommande = await newCommande.save();
        res.status(201).json(savedCommande);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer toutes les commandes
exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find();
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une commande par ID
exports.getCommandeById = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une commande par ID
exports.updateCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.json(commande);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une commande par ID
exports.deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndDelete(req.params.id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.json({ message: "Commande supprimée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

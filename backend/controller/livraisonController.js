const Livraison = require('../model/livraison');

// Créer une nouvelle livraison
exports.createLivraison = async (req, res) => {
    try {
        const newLivraison = new Livraison(req.body);
        const savedLivraison = await newLivraison.save();
        res.status(201).json(savedLivraison);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer toutes les livraisons
exports.getAllLivraisons = async (req, res) => {
    try {
        const livraisons = await Livraison.find();
        res.json(livraisons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une livraison par ID
exports.getLivraisonById = async (req, res) => {
    try {
        const livraison = await Livraison.findById(req.params.id);
        if (!livraison) {
            return res.status(404).json({ message: "Livraison non trouvée" });
        }
        res.json(livraison);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une livraison par ID
exports.updateLivraison = async (req, res) => {
    try {
        const livraison = await Livraison.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!livraison) {
            return res.status(404).json({ message: "Livraison non trouvée" });
        }
        res.json(livraison);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une livraison par ID
exports.deleteLivraison = async (req, res) => {
    try {
        const livraison = await Livraison.findByIdAndDelete(req.params.id);
        if (!livraison) {
            return res.status(404).json({ message: "Livraison non trouvée" });
        }
        res.json({ message: "Livraison supprimée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

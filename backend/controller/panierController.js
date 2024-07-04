const Panier = require('../model/panier');
const Produit = require('../model/Produit');

// Ajouter un produit au panier
exports.addProductToCart = async (req, res) => {
    try {
        const { userId, produitId, stockQuantity } = req.body;

        // Trouver le panier de l'utilisateur
        let panier = await Panier.findOne({ userId });

        if (!panier) {
            panier = new Panier({ userId, products: [] });
        }

        // Vérifier si le produit est déjà dans le panier
        const produitIndex = panier.products.findIndex(p => p.produitId.toString() === produitId);

        if (produitIndex !== -1) {
            // Mettre à jour la quantité du produit existant
            panier.products[produitIndex].stockQuantity += stockQuantity;
        } else {
            // Ajouter un nouveau produit au panier
            panier.products.push({ produitId, stockQuantity });
        }

        await panier.save();
        res.status(201).json(panier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour la quantité d'un produit dans le panier
exports.updateProductInCart = async (req, res) => {
    try {
        const { userId, produitId, stockQuantity } = req.body;

        const panier = await Panier.findOne({ userId });
        if (!panier) {
            return res.status(404).json({ message: "Panier non trouvé" });
        }

        const produitIndex = panier.products.findIndex(p => p.produitId.toString() === produitId);
        if (produitIndex === -1) {
            return res.status(404).json({ message: "Produit non trouvé dans le panier" });
        }

        panier.products[produitIndex].stockQuantity = stockQuantity;

        await panier.save();
        res.json(panier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un produit du panier
exports.removeProductFromCart = async (req, res) => {
    try {
        const { userId, produitId } = req.body;

        const panier = await Panier.findOne({ userId });
        if (!panier) {
            return res.status(404).json({ message: "Panier non trouvé" });
        }

        panier.products = panier.products.filter(p => p.produitId.toString() !== produitId);

        await panier.save();
        res.json(panier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer le panier d'un utilisateur
exports.getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const panier = await Panier.findOne({ userId }).populate('products.produitId');
        if (!panier) {
            return res.status(404).json({ message: "Panier non trouvé" });
        }

        res.json(panier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

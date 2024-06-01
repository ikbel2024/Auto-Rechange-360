const Commande = require('../model/commande');
const Produit = require('../model/produit');
const { sendConfirmationEmail } = require('./emailService');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Créer une nouvelle commande
exports.createCommande = async (req, res) => {
    try {
        const { client, adresse,telephone,methodePaiement, produits,etat, clientEmail } = req.body;

        // Vérifier les quantités disponibles pour chaque produit et calculer le total
        let total = 0;
        for (const item of produits) {
            const produit = await Produit.findById(item.produitId);
            if (!produit) {
                return res.status(404).json({ message: `Produit avec l'ID ${item.produitId} non trouvé` });
            }
            if (produit.quantite < item.quantite) {
                return res.status(400).json({ message: `Quantité insuffisante pour le produit: ${produit.nom}` });
            }
            total += produit.prix * item.quantite;
        }

        // Créer la commande avec le montant total
        const newCommande = new Commande({ client, adresse,telephone,methodePaiement,etat, produits, total });
        const savedCommande = await newCommande.save();

        // Mettre à jour les quantités de produits
        for (const item of produits) {
            const produit = await Produit.findById(item.produitId);
            produit.quantite -= item.quantite;
            await produit.save();
        }

        // Envoi de l'e-mail de confirmation
        const produitsDetails = await Produit.find({ '_id': { $in: produits.map(item => item.produitId) } });
        const productList = produitsDetails.map(produit => `${produit.nom} (Ref: ${produit.reference})`).join(', ');

        // Envoi de l'e-mail
        sendConfirmationEmail(clientEmail, {
            id: savedCommande._id.toString(),
            products: productList,
            total: total.toFixed(2) // Formatte le total en deux décimales
        });

        // Générer le PDF de la commande
        const pdfFileName = await generatePDF(savedCommande, produitsDetails);

        res.status(201).json({ commande: savedCommande, pdf: pdfFileName });
    } catch (error) {
        console.error("Error creating the order: ", error);
        res.status(400).json({ message: error.message });
    }
};

/// Fonction pour générer un PDF à partir des détails de la commande
async function generatePDF(commande, produitsDetails) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const fileName = path.join(__dirname, `Commande_${commande._id}.pdf`);
        const writeStream = fs.createWriteStream(fileName);

        doc.pipe(writeStream);

        // En-tête
        const logoPath = path.join(__dirname, '../assets/logo.jpg');
        doc.image(logoPath, 50, 45, { width: 50 })
            .fontSize(20)
            .fillColor('#333333')
            .text('Détails de la commande', 110, 57)
            .fontSize(10)
            .text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' })
            .moveDown();

        // Informations sur le client et la commande
        doc.fontSize(12)
            .fillColor('#666666')
            .text(`ID de la commande: ${commande._id}`, { continued: true })
            .moveDown()
            .fillColor('#000000')
            .text(`Client: ${commande.client}`)
            .moveDown();

        // Ligne de séparation
        doc.moveTo(50, 160)
            .lineTo(550, 160)
            .stroke();

        // Détails des produits commandés
        doc.fontSize(14)
            .fillColor('#4CAF50')
            .text('Produits commandés:', 50, 180)
            .moveDown();

        // Table des produits
        const tableTop = 200;
        let itemY = tableTop + 20;
        
        doc.fontSize(12)
            .fillColor('#000000')
            .text('N°', 50, tableTop)
            .text('Produit', 70, tableTop)
            .text('Réf.', 250, tableTop)
            .text('Quantité', 350, tableTop)
            .text('Prix Unitaire', 450, tableTop, { width: 90, align: 'right' });

        produitsDetails.forEach((produit, index) => {
            const item = commande.produits.find(p => p.produitId.toString() === produit._id.toString());
            doc.fontSize(12)
                .fillColor('#000000')
                .text(`${index + 1}`, 50, itemY)
                .text(`${produit.nom}`, 70, itemY)
                .text(`${produit.reference}`, 250, itemY)
                .text(`${item.quantite}`, 350, itemY)
                .text(`${produit.prix.toFixed(2)} DT`, 450, itemY, { width: 90, align: 'right' });
            itemY += 20;
        });

        // Montant total
        doc.moveDown()
            .fontSize(14)
            .fillColor('#FF5722')
            .text(`Montant total: ${commande.total.toFixed(2)} DT`, { align: 'right' })
            .moveDown();

        // Remerciements et informations de contact
        doc.fontSize(10)
            .fillColor('#000000')
            .text('Merci pour votre achat !', { align: 'center' })
            .moveDown()
            .text('Pour toute question ou assistance, veuillez nous contacter à support@autorechange.com.tn ou appeler le +33 1 23 45 67 89.', { align: 'center' });

        // Pied de page
        doc.moveTo(50, 700)
            .lineTo(550, 700)
            .stroke();

        doc.fontSize(10)
            .fillColor('#666666')
            .text('Société XYZ - 123 Rue de Exemple, 75001 Paris, France', 50, 710, { align: 'center' });

        doc.end();

        writeStream.on('finish', () => {
            resolve(fileName);
        });

        writeStream.on('error', (err) => {
            reject(err);
        });
    });
}

// Récupérer toutes les commandes
exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find().populate('produits.produitId');
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une commande par ID
exports.getCommandeById = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id).populate('produits.produitId');
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

// Retourner une commande
exports.retournerCommande = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id);

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        // Vérifier si la commande est expédiée ou livrée
        if (commande.etat === "Expédiée") {
            // Calculer le montant des frais de retour (5% du montant total initial)
            const fraisRetour = 0.05 * commande.total;
            // Calculer le montant total du retour (total initial - frais de retour)
            const montantRetour = commande.total - fraisRetour;
            // Mettre à jour le montant total de la commande
            commande.total = montantRetour;
        } else if (commande.etat === "Livré") {
            // Vérifier si la commande a été livrée depuis moins de 15 jours
            const dateLivraison = new Date(commande.dateLivraison);
            const maintenant = new Date();
            const joursDifference = Math.ceil((maintenant - dateLivraison) / (1000 * 60 * 60 * 24));

            if (joursDifference > 15) {
                return res.status(400).json({ message: "La commande ne peut pas être retournée car plus de 15 jours se sont écoulés depuis la livraison." });
            }
        } else {
            return res.status(400).json({ message: "La commande ne peut pas être retournée car elle n'est pas expédiée ou livrée." });
        }

        // Mettre à jour les détails du retour
        commande.retour.estRetournee = true;
        commande.retour.dateRetour = new Date();
        commande.retour.motifRetour = req.body.motifRetour;

        // Restaurer les quantités de produits
        for (const item of commande.produits) {
            const produit = await Produit.findById(item.produitId);
            produit.quantite += item.quantite;
            await produit.save();
        }

        // Enregistrer la commande mise à jour
        const updatedCommande = await commande.save();

        // Mettre à jour le montant total dans l'objet retourné
        updatedCommande.total = commande.total;

        res.json(updatedCommande);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Annuler une commande
exports.annulerCommande = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        
        // Sauvegarder la quantité de produits avant d'annuler la commande
        const produitsQuantitesAvantAnnulation = {};
        for (const item of commande.produits) {
            const produit = await Produit.findById(item.produitId);
            produitsQuantitesAvantAnnulation[item.produitId] = produit.quantite;
        }

        // Mettre à jour les détails d'annulation
        commande.annulation = {
            estAnnulee: true,
            dateAnnulation: new Date(),
            motifAnnulation: req.body.motifAnnulation
        };

        // Restaurer la quantité de produits dans la base de données
        for (const item of commande.produits) {
            const produit = await Produit.findById(item.produitId);
            produit.quantite += item.quantite;
            await produit.save();
        }

        // Enregistrer la commande mise à jour
        const updatedCommande = await commande.save();

        res.json(updatedCommande);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

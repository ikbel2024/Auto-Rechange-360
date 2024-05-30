const express = require('express');
const router = express.Router();
const commandeController = require('../controller/commandeController');

router.post('/', commandeController.createCommande);
router.get('/', commandeController.getAllCommandes);
router.get('/:id', commandeController.getCommandeById);
router.put('/:id', commandeController.updateCommande);
router.delete('/:id', commandeController.deleteCommande);
router.put('/:id/retour', commandeController.retournerCommande);
router.put('/:id/annulation', commandeController.annulerCommande);
module.exports = router;

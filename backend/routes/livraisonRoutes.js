const express = require('express');
const router = express.Router();
const livraisonController = require('../controller/livraisonController');

router.post('/', livraisonController.createLivraison);
router.get('/', livraisonController.getAllLivraisons);
router.get('/:id', livraisonController.getLivraisonById);
router.put('/:id', livraisonController.updateLivraison);
router.delete('/:id', livraisonController.deleteLivraison);

module.exports = router;

const express = require('express');
const router = express.Router();
const panierController = require('../controller/panierController');

router.post('/add', panierController.addProductToCart);
router.post('/update', panierController.updateProductInCart);
router.post('/remove', panierController.removeProductFromCart);
router.get('/:userId', panierController.getCartByUserId);

module.exports = router;

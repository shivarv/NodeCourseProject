const express = require('express');
const router = express.Router();
const path = require('path');
const shopController = require('../controllers/shop');
console.log('in shop routes');

//use matches starting if you use router.use , can handle any /values .. but get needs exact value
router.get('/', shopController.getIndex);

router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);


router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);


router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);



module.exports = router;
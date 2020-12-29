const express = require('express');
const router = express.Router();
const path = require('path');
const shopController = require('../controllers/shop');

//use matches starting if you use router.use , can handle any /values .. but get needs exact value
router.get('/', shopController.getIndex);

router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

router.get("/checkout", shopController.getCheckout);
router.get("/order", shopController.getOrders);



module.exports = router;
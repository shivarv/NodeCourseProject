const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/products');

//use matches starting if you use router.use , can handle any /values .. but get needs exact value
router.get('/', productsController.getProducts);



module.exports = router;
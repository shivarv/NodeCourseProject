const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/products')

// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);
module.exports = router;
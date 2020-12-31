const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/admin');
console.log('in admin routes');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)
// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);
;
// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;
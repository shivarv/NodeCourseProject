const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    console.log('In the middleware');
    res.render('add-product', {
        pageTitle: ' Add Product',
        formsCSS: true,
        productCSS: true,
        activaAddProduct: true,
        path: '/admin/add-product'});    
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({title: req.body.title});
    res.redirect('/');
});
module.exports = {
    routes : router,
    products : products
};
const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');
const adminData = require('./admin');

//use matches starting if you use router.use , can handle any /values .. but get needs exact value
router.get('/', (req, res, next) => {
    console.log('In the middleware shopjs');
    //./views/shop.html wont work, it thinks of the operating system default directory
    //join method is necessary for working fine for all operating system
    //dirname points to the routes folder
    const products = adminData.products;

    //pub file
    res.render('shop', {prods: products, 
                        pageTitle: 'Shop', 
                        path:"/" , 
                        hasProducts: products.length > 0,
                        activeShop: true,
                        productCSS: true
                        });
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});



module.exports = router;
const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    console.log('In the getAddProduct productjs controller');
    res.render('add-product', {
        pageTitle: ' Add Product',
        formsCSS: true,
        productCSS: true,
        activaAddProduct: true,
        path: '/admin/add-product'});    
};

const postAddProduct = (req, res, next) => {
    console.log('In the postAddProduct productjs controller');
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};


const getProducts = (req, res, next) => {
    //pub file
    console.log('in getProducts');
    const products = Product.fetchAll((products) => {
        console.log(products);
        res.render('shop', {prods: products, 
            pageTitle: 'Shop', 
            path:"/" , 
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
            });
    });
};


module.exports = {
    getAddProduct : getAddProduct,
    postAddProduct : postAddProduct,
    getProducts : getProducts
};
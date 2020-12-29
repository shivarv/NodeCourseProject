const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    console.log('In the getAddProduct productjs controller');
    res.render('admin/add-product', {
        pageTitle: ' Add Product',
        formsCSS: true,
        productCSS: true,
        activaAddProduct: true,
        path: '/admin/add-product'});    
};

const postAddProduct = (req, res, next) => {
    console.log('In the postAddProduct productjs controller');
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = Number(req.body.price);
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

const getProducts = (req, res, next) => {
    //pub file
    console.log('in getProducts admin');
    Product.fetchAll((products) => {
        console.log(products);
        res.render('admin/product-list', {prods: products, 
            path:"/admin/products",
            pageTitle: 'Admin Products'
            });
    });
};


module.exports = {
    getAddProduct : getAddProduct,
    postAddProduct : postAddProduct,
    getProducts : getProducts
};
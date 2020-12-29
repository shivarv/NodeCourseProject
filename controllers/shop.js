const Product = require('../models/product');
const Cart = require('../models/cart');

const getProducts = (req, res, next) => {
    //pub file
    console.log('in getProducts');
    Product.fetchAll((products) => {
        console.log(products);
        res.render('shop/product-list', {prods: products, 
            path:"/",
            pageTitle: 'All Products'
            });
    });
};

const getProduct = (req, res, next) => {
    //pub file
    console.log('in getProduct');
    const prodId = req.params.productId;

    Product.findById(prodId, (product) => {
        console.log(product);
        res.render('shop/product-detail', {path: "/products", product: product, pageTitle: product.title});
    });
};

const getIndex = (req, res, next) => {
    console.log('in getIndex method');
    Product.fetchAll(products => {
        res.render('shop/index', {
            path: '/',
            prods: products,
            pageTitle: 'Shop'
        });
    }  
    );
};

const getCart = (req, res, next) => {
    console.log('in getCart method');
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

const postCart = (req, res, next) => {
    console.log('in postCart method');
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    });

    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

const getCheckout = (req, res, next) => {
    console.log('in getCheckout method');
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

const getOrders = (req, res, next) => {
    console.log('in getCheckout method');
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

module.exports = {
    getProducts : getProducts,
    getProduct : getProduct,
    getIndex : getIndex,
    getCart : getCart,
    postCart : postCart,
    getCheckout : getCheckout,
    getOrders : getOrders
};
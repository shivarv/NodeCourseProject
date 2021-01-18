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
    Cart.getCart(cart => {
        const cartProducts = [];
        Product.fetchAll(products => {
            for(let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                cartProducts.push({productData: product, qty: cartProductData.qty});
            }
        })
        console.log('cart products '+cartProducts.length);
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts
        });
    });
};

const postCart = (req, res, next) => {
    console.log('in postCart method');
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    });
    res.redirect('/cart');
};

const postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
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
    getOrders : getOrders,
    postCartDeleteProduct : postCartDeleteProduct
};
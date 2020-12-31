const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    console.log('In the getAddProduct productjs controller');
    res.render('admin/edit-product', {
        pageTitle: ' Add Product',
        path: '/admin/edit-product',
        editing: false
    });    
};

const postAddProduct = (req, res, next) => {
    console.log('In the postAddProduct productjs controller');
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

const getEditProduct = (req, res, next) => {
    console.log('In the getEditProduct productjs controller' +JSON.stringify(req.query));
    console.log(JSON.stringify(req.params));

    const editMode = req.query.edit;
    console.log('editMode '+ editMode);
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log('in find by id return on getEditProduct method ');
        if(!product) {
            return res.redirect('/');
        }
        //product.price = parseInt(product.price);
        //console.log(product);
        res.render('admin/edit-product', { // this is the actual value needed for renderer
            pageTitle: 'Edit Product',
            path: '/admin/edit-product', // this is for coding
            editing: true,
            product: product
        });
    });
      
};

const postEditProduct = (req, res, next) => {
    console.log(' in postEditProduct admin js method');
    const prodId = req.body.productId;
    console.log(prodId);

    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
};

const postDeleteProduct = (req, res, next) => {
    console.log(' in postDeleteProduct admin js method');
    const prodId = req.body.productId;
    console.log(prodId);
    Product.deleteById(prodId);
    //need to redirect oncallback
    res.redirect('/admin/products');
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
    getEditProduct: getEditProduct,
    postEditProduct: postEditProduct,
    postDeleteProduct: postDeleteProduct,
    getProducts : getProducts
};
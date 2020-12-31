// Cart.js
'use strict';
const fs = require('fs');
const path = require('path');
const directoryName = require('../util/path'); // this method returns the root directoryName
const fullPath = path.join(directoryName, 'data', 'cart.json');

module.exports = class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }

    static deleteProduct(productId, productPrice) {
        fs.readFile(fullPath, (err, fileContent) => {
            if(err || !fileContent || fileContent.length === 0) {
                return;
            }
            //fileContent contains list of data
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - product.price * product.qty;
            fs.writeFile(fullPath, JSON.stringify(updatedCart), (err) => {
                console.log('error in filewrite in cartjs '+err);
            });
        });
    }

    static addProduct(productId, productPrice) {
        fs.readFile(fullPath, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err && fileContent && fileContent.length != 0) {
                cart = JSON.parse(fileContent);
            }        
            const existingProduct = cart.products.find(prod => prod.id === productId);
            let updatedProduct;
            if(existingProduct) {
                //updatedProduct = { ...existingProduct};
                //updatedProduct.qty = updatedProduct.qty + 1;
                existingProduct.qty = existingProduct.qty + 1;
                cart.products = [...cart.products];
            } else {
                updatedProduct = {id: productId, qty: 1};
                cart.products = [ ...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + productPrice;
            fs.writeFile(fullPath, JSON.stringify(cart), (err) => {
                console.log('error in filewrite in cartjs '+err);
            });
        });
        // Fetch the previous cart
        // Analyse the cart => Find existing product
        // Add new product / increase quantity
    }
};
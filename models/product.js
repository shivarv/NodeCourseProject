// Product.js
'use strict';
const fs = require('fs');
const path = require('path');
const directoryName = require('../util/path');
const fullPath = path.join(directoryName, 'data', 'products.json');
const Cart = require('./cart');

const getProductsFromFile = (callback) => {
    console.log('in getProductsFromFile productjs '+fullPath);
    fs.readFile(fullPath, (err, fileContent) => {
        //if we dont use arrow function , this wont point to this class anymore
        let products = [];
        if(!err && fileContent && fileContent.length != 0) {
            products = JSON.parse(fileContent);
           // console.log(JSON.parse(fileContent));
        }
        // console.log(products);
        callback(products);
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        console.log('in save method productjs');
        console.log(require.main.filename);
        console.log(fullPath);

        getProductsFromFile( (products) => {
            console.log('in onsave getProductsFromFile callback method ');
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(fullPath, JSON.stringify(updatedProducts), (err) => {
                    if(err) {
                        console.log(err);
                    }
                });
            } else {
                this.id = Math.random().toString();
                //console.log(products);
                products.push(this);
                if(products && products.length > 0) {
                    fs.writeFile(fullPath, JSON.stringify(products), (err) => {
                        if(err) {
                            console.log(err);
                        }
                    });
                }
            }
        });
    }
    
    static deleteById(id) {
        console.log('in deleteById method ');

        getProductsFromFile( products => {
            const product = products.find(prod => prod.id === id);
            const remainingProducts = products.filter(currentProduct => currentProduct.id !== id);
            fs.writeFile(fullPath, JSON.stringify(remainingProducts), (err) => {
                if(!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    static fetchAll(callback) {
        console.log('in fetchAll method ');
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        console.log('in findById method ');
        getProductsFromFile( products => {
            const product = products.find(currentProduct => currentProduct.id === id);
            callback(product);
        });
    }
};
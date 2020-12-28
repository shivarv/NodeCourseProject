// Product.js
'use strict';
const fs = require('fs');
const path = require('path');
const directoryName = require('../util/path');
const fullPath = path.join(directoryName, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    console.log('in getProductsFromFile productjs '+fullPath);
    fs.readFile(fullPath, (err, fileContent) => {
        //if we dont use arrow function , this wont point to this class anymore
        let products = [];
        if(!err && fileContent && fileContent.length != 0) {
            products = JSON.parse(fileContent);
            console.log(JSON.parse(fileContent));
        }
        console.log(products);
        callback(products);
    });
};

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        console.log('in save method ');
        console.log(require.main.filename);
        console.log(fullPath);

        getProductsFromFile( (products) => {
            console.log('in onsave getProductsFromFile callback method ');
            console.log(products);
            products.push(this);
            if(products && products.length > 0) {
                fs.writeFile(fullPath, JSON.stringify(products), (err) => {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}
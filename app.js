const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('In the middleware');
    res.send('<form action="/product" method="post"><input type="text" name="title"></input><button type="submit">add Product</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log('in product '+req.body);

    res.redirect('/');
});
app.use('/', (req, res, next) => {
    console.log('In the middleware');
    res.send('<h1>Hello from Express!</h1>');
});
app.listen(3000);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop.js');

app.set('view engine', 'pug'); // app.set is to set global configuration item... eg ejs , pug, handlers for dynamic template
app.set('views', 'views'); // to tell nodejs that this is in views folder , default is same, so its generally not needed
app.use(bodyParser.urlencoded({extended: false}));
// any access to files will point to the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(3000);

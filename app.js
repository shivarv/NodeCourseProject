const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop.js');

const errorController = require('./controllers/error.js');

//we have set the view engine as handlebars ... hbs must be the file extension
//app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})); // pug , ejs doesnt need this
app.set('view engine', 'ejs'); // app.set is to set global configuration item... eg ejs , pug, handlers for dynamic template
app.set('views', 'views'); // to tell nodejs that this is in views folder , default is same, so its generally not needed


app.use(bodyParser.urlencoded({extended: false}));
// any access to files will point to the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use("/admin", adminRoutes);


app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);

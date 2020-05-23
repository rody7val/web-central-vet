const config = require('./config')
const express = require('express')
const mongoose = require('mongoose');
const fs = require('fs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mercadopago = require('mercadopago')
const session = require('express-session')
const Categories = require('./controllers/categoriesController')
// Create Express Application
const app = express()
const api = require('./routes/api')(express);
const web = require('./routes/web')(express);


// Data Base Conection
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});

// Add Body and Cookie Parser Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser('semilla'));
app.use(session({
    secret: 'semilla',
    resave: false,
    saveUninitialized: true
}));

// Public Directory
app.use(express.static(__dirname + '/public'));

// Session helpers
app.use((req, res, next) => {
  Categories.getAll((err, categories) => {
    //routes
    req.session.path = req.path
    req.session.query = req.query
    console.log(req.query)
    //auth
    res.locals.session = req.session;
    //vars
    res.locals.heads = config.heads;
    res.locals.services = config.services;
    //items and categories
    res.locals._categories = categories
    next();
  })

});

// Set Jade as View Engine
app.set('view engine', 'jade')

// API REST
app.use('/api', api);
// Web Routes
app.use('/', web);

// Iniialize mercadopago SDK
mercadopago.configure({
  client_id: config.client_id,
  client_secret: config.client_secret
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});

// Start Express Application
app.listen(config.port, "0.0.0.0", () => {
  console.log('Servidor funcionando!');
})

//firebase.auth().onAuthStateChanged((user) => {
  //console.log(user)
//}

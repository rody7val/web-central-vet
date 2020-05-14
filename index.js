const config = require('./config')
const express = require('express')
const mongoose = require('mongoose');
const fs = require('fs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mercadopago = require('mercadopago')
const session = require('express-session')

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
    res.locals.session = req.session;
    next();
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

// File from Parameter View Examples
app.get(/\/(.+)/, function (req, res) {
  const fileFromParameter = req.params[0] + '.js'

  if (fs.existsSync(fileFromParameter)) {
    // Execute the file found
    require('./' + fileFromParameter).run(req, res)
  } else {
    // Return 404
    res.status(404).render('404', {
      file: fileFromParameter
    })
  }
})

// Start Express Application
app.listen(config.port, "0.0.0.0", () => {
  console.log('Servidor funcionando!');
})

//firebase.auth().onAuthStateChanged((user) => {
  //console.log(user)
//}

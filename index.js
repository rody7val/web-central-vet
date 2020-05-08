const config = require('./config')
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const mercadopago = require('mercadopago')

// Create Express Application
const app = express()
const api = require('./routes/api')(express);

// Add Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// directorio píblico
app.use(express.static(__dirname + '/public'));

// Set Jade as View Engine
app.set('view engine', 'jade')

// API 
app.use('/api', api);

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
app.listen(process.env.PORT || config.port, "0.0.0.0", () => {
  console.log('Servidor funcionando!');
})

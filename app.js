var express = require('express');
const app = new express();
const cors = require('cors');
const DataService = require('./src/DataService');

app.use(function(req, res, next) {
  console.log(`${req.method} request for '${req.url}`);
  next();
});

const service = new DataService();

// app.use(express.static('./public')); our client is another application

// apply CORS middleware to allow requests from any domain
app.use(cors());

// serve static files for test environment
app.use(express.static('public'));

app.get('/dev/api/v1/cuca', function(req, res) {
  const data = service.getContent('cuca');
  res.json(data);
});

app.get('/dev/api/v1/deos', function(req, res) {
  const data = deosSiteData;
  res.json(data);
});

const port_number = process.env.PORT || 3000;
app.listen(port_number);

console.log(
  'Breeze CMS express server app running in port: ' +
    port_number +
    ' in the ' +
    process.env.ENVIRONMENT +
    ' environment !!!',
);

module.exports = app;

var express = require('express');
// var cucaSiteData = require('./data/cuca/siteData_sp_ar.json');
const deosSiteData = require('./data/deos/siteData.json');
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

app.listen(3002);

console.log(
  'Breeze CMS express server app running in port 3002 in the ' +
    process.env.ENVIRONMENT +
    ' environment ',
);

module.exports = app;

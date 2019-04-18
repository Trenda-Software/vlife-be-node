var express = require('express');
var cucaSiteData = require('./data/cuca/siteData.json');
// var deosSiteData = require("./data/deos/siteData.json");
var app = new express();
var cors = require('cors');
// var _ = require('lodash');

app.use(function(req, res, next) {
  console.log(`${req.method} request for '${req.url}`);
  next();
});

// app.use(express.static('./public')); our client is another application

// apply CORS middleware to allow requests from any domain
app.use(cors());

// serve static files for test environment
app.use(express.static('public'));

app.get('/dev/api/v1/cuca', function(req, res) {
  const data = cucaSiteData;
  res.json(data);
});

app.get('/dev/api/v1/deos', function(req, res) {
  const data = deosSiteData;
  res.json(data);
});

app.listen(3002);

console.log('SouthSwell express server app running in port 3002');

module.exports = app;

/**
 * Created by javierhack on 25/6/17.
 */
var express = require('express');
var logoData = require('./data/logo-data.json');
var bannerData = require('./data/banner-data.json');
var menuData = require('./data/menu-data.json');
var servicesData = require('./data/services-data.json');
var app = new express();
var cors = require('cors');
var _  = require('lodash');

app.use(function(req, res, next) {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// app.use(express.static('./public')); our client is another application

// apply CORS middleware to allow requests from any domain
app.use(cors());

app.get('/content-api', function(req, res) {
  const data = _.merge(logoData, bannerData, menuData, servicesData);
  res.json(data);
});

app.listen(3002);

console.log('SouthSwell express server app running in port 3002');

module.exports = app;

/**
 * Created by javierhack on 25/6/17.
 */
var express = require('express');
var cucaSiteData = require('./data/cuca/siteData.json');
var app = new express();
var cors = require('cors');
// var _ = require('lodash');

app.use(function (req, res, next) {
    console.log(`${req.method} request for '${req.url}`);
    next();
});

// app.use(express.static('./public')); our client is another application

// apply CORS middleware to allow requests from any domain
app.use(cors());

app.get('/cuca/data', function (req, res) {
    // const data = _.merge(logoData, bannerData, menuData, servicesData);
    const data = cucaSiteData;
    res.json(data);
});

app.listen(3002);

console.log('SouthSwell express server app running in port 3002');

module.exports = app;

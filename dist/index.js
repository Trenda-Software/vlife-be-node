"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import cors from 'cors';
var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
  return res.send("BREEZE CMS API on PORT: ".concat(PORT));
}); // const DataService = require('./src/DataService');
// app.use(function(req, res, next) {
//   console.log(`${req.method} request for '${req.url}`);
//   next();
// });
// const service = new DataService();
// apply CORS middleware to allow requests from any domain
// app.use(cors());
// // serve static files for test environment
// app.use(express.static('public'));
// app.get('/dev/api/v1/cuca', function(req, res) {
//   getSiteContent(res, 'cuca');
// });
// app.get('/dev/api/v1/deos', function(req, res) {
//   // getSiteContent(res, 'deos');
//   console.log('DAFUQ: ');
//   testDB(res);
// });

app.listen(PORT, function () {
  return console.log("Breeze CMS express server app running in: http://localhost:".concat(PORT, " in the ").concat(process.env.ENVIRONMENT, " environment !!!"));
});

function getSiteContent(res, site) {
  service.getContent(site).then(function (data) {
    console.log('getSiteContent: ', data);
    var siteData = data[0].content;
    res.json(siteData);
  })["catch"](function (err) {
    console.log(err);
  });
}

function testDB(res) {
  console.log('testDB: ');
  service.testDB();
}

module.exports = app;
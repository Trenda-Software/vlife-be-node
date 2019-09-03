import express from 'express';
import routes from './routes/siteRoutes.js';
// import cors from 'cors';
import DataService from './service/DataService';

const app = express();
const PORT = process.env.PORT || 3000;
const ds = new DataService();

console.log(ds);

routes(app);

app.get('/', (req, res) => res.send(`BREEZE CMS API on PORT: ${PORT}`));

// const DataService = require('./src/DataService');

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

app.listen(PORT, () => {
    console.log(ds);

    console.log(
        `Breeze CMS express server app running in: http://localhost:${PORT} in the ${process.env.ENVIRONMENT} environment !!!`
    );
});

function getSiteContent(res, site) {
    service
        .getContent(site)
        .then(data => {
            console.log('getSiteContent: ', data);
            const siteData = data[0].content;
            res.json(siteData);
        })
        .catch(err => {
            console.log(err);
        });
}

function testDB(res) {
    console.log('testDB: ');

    service.testDB();
}

module.exports = app;

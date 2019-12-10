import express from 'express';
import siteRoutes from './routes/siteRoutes';
import pageRoutes from './routes/pageRoutes';
import DataService from './service/DataService';
// import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const ds = new DataService();
ds.connect();

// add routes
siteRoutes(app, ds);
pageRoutes(app, ds);

app.get('/', (req: any, res: any) => res.send(`VLife API on PORT: ${PORT}`));

// app.use(function(req, res, next) {
//   console.log(`${req.method} request for '${req.url}`);
//   next();
// });

// apply CORS middleware to allow requests from any domain
// app.use(cors());

// // serve static files for test environment
// app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(
        `VLife server app running in: http://localhost:${PORT} in the ${process.env.ENVIRONMENT} env WITH Typescript!!!`
    );
});

export default app;

import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const router = (app: any, ds: DataService) => {
    app.route('/country')
        .get(verifytoken, (req: any, res: any) => {
            const country: any = ds.dbModels.country;

            country.findAll().then((countries: any[]) => {
                res.send(countries);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

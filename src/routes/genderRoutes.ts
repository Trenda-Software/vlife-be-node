import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const router = (app: any, ds: DataService) => {
    app.route('/gender')
        .get(verifytoken, (req: any, res: any) => {
            const gender: any = ds.dbModels.gender;

            gender.findAll().then((genders: any[]) => {
                res.send(genders);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

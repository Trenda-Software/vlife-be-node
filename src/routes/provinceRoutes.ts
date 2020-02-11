import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const router = (app: any, ds: DataService) => {
    app.route('/provincia')
        .get(verifytoken, (req: any, res: any) => {
            const provincia: any = ds.dbModels.province;

            provincia.findAll({
                include: [{ model: ds.dbModels.country }]
            }).then((provinces: any[]) => {
                res.send(provinces);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

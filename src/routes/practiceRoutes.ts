import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const router = (app: any, ds: DataService) => {
    app.route('/practica')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const PracticeModel: any = ds.dbModels.practice;
                    PracticeModel.findAll({
                        include: [{ model: ds.dbModels.specialty }],
                    }).then((practices: any[]) => {
                        res.send(practices);

                    });
                }
            });

        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('Practice POST Req Ok');
        });
};

export default router;

import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');

const router = (app: any, ds: DataService) => {
    app.route('/especialidad')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const SpecialtyModel: any = ds.dbModels.specialty;
                    SpecialtyModel.findAll({
                        include: [{ model: ds.dbModels.practice }],
                    }).then((specialtys: any[]) => {
                        res.send(specialtys);

                    });
                }
            });

        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('Specialty POST Req Ok');
        });
};

export default router;

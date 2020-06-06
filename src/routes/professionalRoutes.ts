import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');


const router = (app: any, ds: DataService) => {
    app.route('/professional')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const ProfessionalModel: any = ds.dbModels.professional;

                    const Gender: any = ds.dbModels.gender;
                    /*
                        approved
                        -0 si la cuenta todavia esta pendiente de revision (de la foto de matricula)
                        -1 si fue rechazada
                        -2 si fue aceptada
                    */
                    var approved = req.query.approved || '';
                    var where = {};
                    console.log(approved);

                    if (approved != '') {
                        console.log('entre');
                        where = {
                            approved: approved
                        };
                    }

                    ProfessionalModel.findAll({
                        include: [Gender],
                        attributes: { exclude: ['code', 'pwd', 'city', 'rating', 'CountryId', 'ProvinceId'] },
                        where: where
                    }).then((profesional: any[]) => {
                        res.send(profesional);
                    });
                }

            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('User POST Req Ok');
        });
};

export default router;

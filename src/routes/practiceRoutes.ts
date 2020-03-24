import DataService from '../service/DataService';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const { Sequelize } = require('sequelize');

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
        .post(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const practicas = req.body.practicesid;
                    var clausula = "";
                    for (let practica in practicas) {
                        clausula = clausula + "practiceID = " + practicas[practica] + " or ";
                    }
                    clausula = clausula.slice(0, -4);
                    console.log("where :" + clausula);

                    ds.dbClient.query("select professionals.id,name,surname,sum(cost) as cost, '1km' as distance from professionals  inner join practicecosts on professionals.id = professionalid where professionals.id in (select professionalid from practicecosts where " + clausula + " ) group by professionalid ", { type: Sequelize.QueryTypes.SELECT })
                        .then((profesional: any[]) => {
                            // We don't need spread here, since only the results will be returned for select queries
                            console.log(JSON.stringify(profesional));
                            res.send(profesional);
                        });



                }
            });
        });
};

export default router;

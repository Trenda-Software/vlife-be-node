import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
const verifytoken = require('../validation/verifyToken');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const router = (app: any, ds: DataService) => {

    app.route('/practicesProf')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const profesional: any = ds.dbModels.professional;
                    const profId = await profesional.findOne({
                        where: { id: req.query.id }
                    });

                    if (!profId) return res.status(400).send('El profesional no existe en la base');

                    // Borro las practicas viejas

                    const practicas = await ds.dbClient.query("select Practices.id as PracticesID, Practices.name, PracticeCosts.cost from PracticeCosts inner join Practices on PracticeCosts.PracticeId = Practices.id  where PracticeCosts.ProfessionalId = " + req.query.id, { type: Sequelize.QueryTypes.SELECT })


                    res.json({
                        message: practicas
                    });
                }
            });

        })
        .post(verifytoken, async (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    //checking if the email exist
                    const t = await ds.dbClient.transaction();

                    try {
                        const profesional: any = ds.dbModels.professional;
                        const profId = await profesional.findOne({
                            where: { id: req.body.id }
                        });

                        if (!profId) return res.status(400).send('El profesional no existe en la base');

                        // Borro las practicas viejas
                        const PracticeCostModel: any = ds.dbModels.practicecost;
                        const practicasCost = await PracticeCostModel.findOne({
                            where: { ProfessionalId: req.body.id }
                        });

                        await PracticeCostModel.destroy({
                            where: { ProfessionalId: req.body.id }
                        });
                        // UPDATE "posts" SET "deletedAt"=[timestamp] WHERE "deletedAt" IS NULL AND "id" = 1

                        //Seteo las practicas asociadas

                        const practicas1 = req.body.practices;

                        const practicas = practicas1.map(async (practica: any) => {

                            const PracticeCost = await PracticeCostModel.create({
                                cost: practica.cost,
                            });
                            await PracticeCost.setProfessional(req.body.id);
                            await PracticeCost.setPractice(practica.id);
                            return practicas;
                        });
                        Promise.all(practicas)
                            .then(async returnedValues => {
                                console.log("practicas: " + JSON.stringify(practicas));
                                await t.commit();
                                res.json({ message: "Practicas actualizadas correctamente" });
                            })
                            .catch(reason => {
                                console.log(reason);
                                return res.json({ message: JSON.stringify(reason) });
                            });



                    } catch (err) {
                        await t.rollback();
                        res.json({ message: JSON.stringify(err) });
                    }
                }
            });
        });


};
export default router;

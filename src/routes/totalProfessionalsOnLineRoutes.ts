import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
const verifytoken = require('../validation/verifyToken');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const router = (app: any, ds: DataService) => {

    app.route('/totalProfessionalsOnLine')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const id = req.query.id || '';


                    if (id > 0) {
                        const profOnLine1 = await ds.dbClient.query("select count(*) as count from Professionals inner join Specialties_Professionals on Specialties_Professionals.ProfessionalId = Professionals.id where Professionals.on_line = true and Specialties_Professionals.SpecialtyId = " + id, { type: Sequelize.QueryTypes.SELECT });
                        console.log('count', profOnLine1[0].count);

                        res.json(profOnLine1[0].count);
                    } else {
                        const profesional: any = ds.dbModels.professional;
                        const profOnLine = await profesional.findAll({
                            where: { on_line: true }
                        });

                        console.log("Cantidad de prof online " + profOnLine.length)

                        res.json(profOnLine.length);
                    }

                }
            });

        })
        .post(verifytoken, async (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json({
                        message: 'POST generado JWT',
                    });
                }
            });
        });


};
export default router;

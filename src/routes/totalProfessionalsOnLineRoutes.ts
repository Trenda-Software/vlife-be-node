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
                    const profesional: any = ds.dbModels.professional;
                    const profOnLine = await profesional.findAll({
                        where: { on_line: true }
                    });

                    console.log("Cantidad de prof online " + profOnLine.length)

                    res.json(profOnLine.length);
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

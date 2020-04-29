import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
const { Sequelize } = require('sequelize');

const router = (app: any, ds: DataService) => {

    app.route('/checkRecoveryCode')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {

                if (req.body.prof) {
                    const recode = await ds.dbClient.query("select recoverycode from Professionals where email = '" + req.body.email + "' and recoverycode = '" + req.body.code + "'", { type: Sequelize.QueryTypes.SELECT });
                    if (recode.length == 0) return res.status(200).json({ message: "El codigo no existe" });

                    const recode1 = await ds.dbClient.query("select recoverycode from Professionals where email = '" + req.body.email + "' and (timestampdiff(hour,  updatedAt,now() ) <  24 ) and recoverycode = '" + req.body.code + "'", { type: Sequelize.QueryTypes.SELECT });
                    if (recode1.length == 0) return res.status(200).json({ message: "El codigo caduco" });

                } else {
                    const recode = await ds.dbClient.query("select recoverycode from Users where email = '" + req.body.email + "' and recoverycode = '" + req.body.code + "'", { type: Sequelize.QueryTypes.SELECT });
                    if (recode.length == 0) return res.status(200).json({ message: "El codigo no existe" });

                    const recode1 = await ds.dbClient.query("select recoverycode from Users where email = '" + req.body.email + "' and (timestampdiff(hour,  updatedAt,now() ) <  24 ) and recoverycode = '" + req.body.code + "'", { type: Sequelize.QueryTypes.SELECT });
                    console.log(recode1.length);
                    if (recode1.length == 0) return res.status(200).json({ message: "El codigo caduco" });
                }

                res.status(200).json({
                    message: 'Codigo validado'
                });
            } catch (err) {
                console.log("error -- " + JSON.stringify(err))
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

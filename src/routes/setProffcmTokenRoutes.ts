import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';

const router = (app: any, ds: DataService) => {

    app.route('/setProfPMtokenbyId')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                const profesional: any = ds.dbModels.professional;
                const profFcm = await profesional.findOne({
                    where: { id: req.body.id }
                });

                if (!profFcm) return res.status(400).send('El id no existe en la base de datos');

                const profFcmUpd = await profesional.update({ fcmtoken: req.body.fcmtoken }, {
                    where: { id: req.body.id }
                });
                console.log("update " + req.body.fcmtoken);
                console.log("update " + profFcmUpd);

                res.status(200).json({
                    message: 'FCM Token Almacenado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + JSON.stringify(err))
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//MAca ojo mayuscula y minuscula

const router = (app: any, ds: DataService) => {

    app.route('/fcmtoken')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                const usuario: any = ds.dbModels.user;
                const userFcm = await usuario.findOne({
                    where: { id: req.body.id }
                });

                if (!userFcm) return res.status(200).send('El id no existe en la base de datos');

                const userFcmUpd = await usuario.update({ fcmtoken: req.body.fcmtoken }, {
                    where: { id: req.body.id }
                });
                console.log("update " + req.body.fcmtoken);
                console.log("update " + userFcmUpd);

                res.status(200).json({
                    message: 'FCM Token Almacenado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

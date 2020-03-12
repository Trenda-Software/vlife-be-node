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
                const userfcm = await usuario.findOne({
                    where: { email: req.body.email }
                });

                if (!userfcm) return res.status(400).send('El email no existe en la base de datos');

                const userfcmupd = await usuario.update({ fcmtoken: req.body.fcmtoken }, {
                    where: { email: req.body.email }
                });
                console.log("update " + req.body.fcmtoken);
                console.log("update " + userfcmupd);

                res.status(200).json({
                    message: 'FCM Token Almacenado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: err });
            }
        });


};
export default router;

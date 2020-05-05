import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//MAca ojo mayuscula y minuscula

const router = (app: any, ds: DataService) => {

    app.route('/logOutUser')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {

                if (req.body.prof) {
                    const profesional: any = ds.dbModels.professional;
                    const profFcm = await profesional.findOne({
                        where: { id: req.body.userId }
                    });

                    if (!profFcm) return res.status(200).send('El id no existe en la base de datos');

                    const profFcmUpd = await profesional.update({ fcmtoken: null }, {
                        where: { id: req.body.userId }
                    });

                } else {
                    const usuario: any = ds.dbModels.user;
                    const userFcm = await usuario.findOne({
                        where: { id: req.body.userId }
                    });

                    if (!userFcm) return res.status(200).send('El id no existe en la base de datos');

                    const userFcmUpd = await usuario.update({ fcmtoken: null }, {
                        where: { id: req.body.userId }
                    });

                }

                res.status(200).json({
                    message: 'FCM Token Borrado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

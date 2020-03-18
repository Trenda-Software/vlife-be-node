import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


const router = (app: any, ds: DataService) => {

    app.route('/usrgeoloc')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                const usuario: any = ds.dbModels.user;
                const usergeo = await usuario.findOne({
                    where: { email: req.body.id }
                });

                if (!usergeo) return res.status(400).send('El email no existe en la base de datos');

                const usergeoupd = await usuario.update({ lng: req.body.coords.lng, lat: req.body.coords.lat }, {
                    where: { email: req.body.id }
                });
                console.log("update " + req.body.coords);
                console.log("update " + usergeoupd);

                res.status(200).json({
                    message: 'Coordenadas almacenadas Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: err });
            }
        });


};
export default router;

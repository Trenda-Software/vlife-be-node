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
                const userGeo = await usuario.findOne({
                    where: { id: req.body.id }
                });

                if (!userGeo) return res.status(400).send('El id no existe en la base de datos');

                const userGeoUpd = await usuario.update({ lng: req.body.coords.lng, lat: req.body.coords.lat }, {
                    where: { id: req.body.id }
                });
                console.log("update " + req.body.coords);
                console.log("update " + userGeoUpd);

                res.status(200).json({
                    message: 'Coordenadas almacenadas Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + JSON.stringify(err))
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';


const router = (app: any, ds: DataService) => {

    app.route('/profgeoloc')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {

                const profesional: any = ds.dbModels.professional;
                const profGeo = await profesional.findOne({
                    where: { id: req.body[0].id }
                });

                if (!profGeo) return res.status(200).send('El id no existe en la base de datos');

                const profGeoUpd = await profesional.update({ lng: req.body[0].coords.lng, lat: req.body[0].coords.lat }, {
                    where: { id: req.body[0].id }
                });
                console.log("update " + req.body[0].coords);
                console.log("update " + profGeoUpd);

                res.status(200).json({
                    message: 'Coordenadas almacenadas Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

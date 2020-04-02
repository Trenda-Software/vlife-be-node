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
                const profgeo = await profesional.findOne({
                    where: { id: req.body.id }
                });

                if (!profgeo) return res.status(400).send('El id no existe en la base de datos');

                const profgeoupd = await profesional.update({ lng: req.body.coords.lng, lat: req.body.coords.lat }, {
                    where: { id: req.body.id }
                });
                console.log("update " + req.body.coords);
                console.log("update " + profgeoupd);

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

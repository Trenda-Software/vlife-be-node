import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//MAca ojo mayuscula y minuscula

const router = (app: any, ds: DataService) => {

    app.route('/terminarserv')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                const request: any = ds.dbModels.request;
                const request1 = await request.findOne({
                    where: { id: req.body.id }
                });

                if (!request1) return res.status(400).send('El id no existe en la base de datos');

                const userID = request1.UserId;
                const professioanlID = request1.ProfessionalId;

                const request2 = await request.update({ staterequest: 3 }, {
                    where: { id: req.body.id }
                });

                const prefessional: any = ds.dbModels.professional;
                const prof1 = await prefessional.update({ in_service: false }, {
                    where: { id: professioanlID }
                });

                console.log("update " + req.body.id);


                res.status(200).json({
                    message: 'Servicio finalizado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: err });
            }
        });


};
export default router;

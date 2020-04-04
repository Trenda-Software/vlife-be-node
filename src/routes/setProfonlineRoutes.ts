import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//MAca ojo mayuscula y minuscula

const router = (app: any, ds: DataService) => {

    app.route('/setProfonline')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                const profesional: any = ds.dbModels.professional;
                const proffcm = await profesional.findOne({
                    where: { id: req.body.id }
                });

                if (!proffcm) return res.status(400).send('El id no existe en la base de datos');

                const proffcmupd = await profesional.update({ on_line: req.body.on_line }, {
                    where: { id: req.body.id }
                });
                console.log("update " + req.body.on_line);
                console.log("update " + proffcmupd);

                res.status(200).json({
                    message: 'Estado Almacenado Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: err });
            }
        });


};
export default router;

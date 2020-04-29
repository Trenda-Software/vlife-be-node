import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';

const router = (app: any, ds: DataService) => {

    app.route('/setNewPass')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {

                if (req.body.prof) {
                    const profesional: any = ds.dbModels.professional;
                    const prof = await profesional.findOne({
                        where: { email: req.body.email }
                    });

                    if (!prof) return res.status(200).json({ message: "El mail no existe en la base de datos" });

                    const profUpd = await profesional.update({ pwd: req.body.pass, recoverycode: null }, {
                        where: { email: req.body.email }
                    });
                } else {
                    const usuario: any = ds.dbModels.user;
                    const usr = await usuario.findOne({
                        where: { email: req.body.email }
                    });

                    if (!usr) return res.status(200).json({ message: "El mail no existe en la base de datos" });

                    const usrUpd = await usuario.update({ pwd: req.body.pass, recoverycode: null }, {
                        where: { email: req.body.email }
                    });
                }


                res.status(200).json({
                    message: 'Clave Almacenadaa Correctamente!!'
                });
            } catch (err) {
                console.log("error -- " + JSON.stringify(err))
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

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

                    if (!prof) return res.status(200).json({ message: false });

                    const profUpd = await profesional.update({ pwd: req.body.pass, recoverycode: null }, {
                        where: { email: req.body.email }
                    });
                } else {
                    const usuario: any = ds.dbModels.user;
                    const usr = await usuario.findOne({
                        where: { email: req.body.email }
                    });

                    if (!usr) return res.status(200).json({ message: false });

                    const usrUpd = await usuario.update({ pwd: req.body.pass, recoverycode: null }, {
                        where: { email: req.body.email, recoverycode: req.body.refreshCode }
                    });
                    console.log(usrUpd);
                    console.log(req.body.refreshCode);
                    if (usrUpd == 0) return res.status(200).json({ message: false });
                }


                res.status(200).json({
                    message: true
                });
            } catch (err) {
                console.log("error -- " + JSON.stringify(err))
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

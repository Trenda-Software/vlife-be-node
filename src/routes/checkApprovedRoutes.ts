import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';

const router = (app: any, ds: DataService) => {

    app.route('/checkApproved')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {

                const profesional: any = ds.dbModels.professional;
                const prof = await profesional.findOne({
                    where: { id: req.body.id }
                });

                if (!prof) return res.status(200).json({ value: false, approved: -1 });

                res.status(200).json({
                    value: true, approved: prof.approved
                });
            } catch (err) {
                console.log("error -- " + JSON.stringify(err))
                return res.status(400).json({ value: false, message: JSON.stringify(err) });
            }
        });


};
export default router;

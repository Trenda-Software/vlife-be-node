import DataService from '../service/DataService';
import { any } from 'bluebird';
import app from '../server';
//MAca ojo mayuscula y minuscula

const router = (app: any, ds: DataService) => {

    app.route('/cancelAllRequests')
        .get((req: any, res: any) => {
            res.json({
                message: 'Get generado JWT',
            });
        })
        .post(async (req: any, res: any) => {
            try {
                const request: any = ds.dbModels.request;
                const request1 = await request.findOne({
                    where: {
                        Professionalid: req.body.professionalid,
                        staterequest: 5
                    }
                });

                console.log("request state 5 " + JSON.stringify(request1));

                if (request1) return res.status(200).send('Posee un servicio pago, no puede cancelarlo');

                const requestUpdate = await request.update({ staterequest: 8, commentprof: 'Cancelado por logout' }, {
                    where: {
                        Professionalid: req.body.professionalid,
                        staterequest: [0, 2]
                    }
                });
                console.log("request update " + JSON.stringify(requestUpdate));
                console.log("update " + req.body.professionalid);


                res.status(200).json({
                    message: 'Requests Canceladas!!'
                });
            } catch (err) {
                console.log("error -- " + err)
                return res.status(400).json({ message: JSON.stringify(err) });
            }
        });


};
export default router;

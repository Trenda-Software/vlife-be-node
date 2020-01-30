import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/provincia')
        .get((req: any, res: any) => {
            const provincia: any = ds.dbModels.province;

            provincia.findAll().then((provincias: any[]) => {
                res.send(provincias);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

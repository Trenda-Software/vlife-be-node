import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/pais')
        .get((req: any, res: any) => {
            const pais: any = ds.dbModels.pais;

            pais.findAll().then((paises: any[]) => {
                res.send(paises);
            });

        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

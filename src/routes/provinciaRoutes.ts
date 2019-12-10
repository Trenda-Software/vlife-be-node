const ProvinciaModel = require('../db/models/provincia');

const router = (app: any, sequelizeClient: any) => {
    app.route('/provincia')
        .get((req: any, res: any) => {
            const Provincia: any = ProvinciaModel(sequelizeClient);
            Provincia.findAll().then((provincias: any[]) => {
                res.send(provincias);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

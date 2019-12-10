const PaisModel = require('../db/models/Pais');

const router = (app: any, sequelizeClient: any) => {
    app.route('/Pais')
        .get((req: any, res: any) => {
            const Pais: any = PaisModel(sequelizeClient);
            Pais.findAll().then((Paiss: any[]) => {
                res.send(Paiss);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/practica')
        .get((req: any, res: any) => {
            console.log('holA estoy en Practica');
            const practica: any = ds.dbModels.practica;
            practica
                .findAll({
                    include: [{ model: ds.dbModels.especialidad }],
                })
                .then((practicas: any[]) => {
                    res.send(practicas);
                });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

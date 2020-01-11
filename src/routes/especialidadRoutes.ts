import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/cantPorEspecialidad')
        .get((req: any, res: any) => {
            const especialidad: any = ds.dbModels.especialidad;

            especialidad.findAll().then((especialidad: any[]) => {
                res.send(especialidad);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

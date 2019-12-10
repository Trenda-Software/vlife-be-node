import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/cantPorEspecialidad')
        .get((req: any, res: any) => {
            const especialidadView: any = ds.dbModels.especialidadViewModel;

            especialidadView.findAll().then((cantPorEspecialidad: any[]) => {
                res.send(cantPorEspecialidad);
            });
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;

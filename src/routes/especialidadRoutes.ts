import DataService from '../service/DataService';

const router = (app: any, ds: DataService) => {
    app.route('/cantPorEspecialidad')
        .get(async (req: any, res: any) => {
            const especialidad: any = ds.dbModels.especialidad;

            const especialidades = await especialidad.findAll();
            res.send(especialidades);
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
    app.route('/cantPorEspecialidad2')
        .get(async (req: any, res: any) => {
            const especialidad2: any = ds.dbModels.especialidad2;

            const especialidades2 = await especialidad2.findAll();
            res.send(especialidades2);
        })
        .post((req: any, res: any) => {
            res.status(201);
            res.send('live POST Req Ok');
        });
};

export default router;
